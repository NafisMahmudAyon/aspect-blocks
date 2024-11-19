import React, { useState, useEffect, useRef, useMemo } from "react";
import { tailwindCSS } from "./tailwindClasses";

const TailwindInput = ({ update, customClasses = [], val }) => {
	const [inputValue, setInputValue] = useState(val || "");
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
	const inputRef = useRef(null);
	const activeSuggestionRef = useRef(null);

	useEffect(() => {
		setInputValue(val)
	}, [val]);

	const tailwindClasses = useMemo(
		() => [...tailwindCSS, ...customClasses],
		[customClasses],
	);

	// Debounce mechanism to delay filtering
	const debounce = (func, delay) => {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => func(...args), delay);
		};
	};

	// Handle input change with suggestion filtering
	const handleInputChange = (e) => {
		const value = e.target.value;
		setInputValue(value); // Update state for normal textarea behavior
		update(value); // Notify parent of value change
		filterSuggestions(value); // Update suggestions based on the value
	};

	// Filter suggestions based on the current word
	const filterSuggestions = debounce((value) => {
		const currentWord = value.split(" ").pop(); // Get the last word being typed
		if (currentWord) {
			let filtered = [];

			if (currentWord.includes(":")) {
				// Handle modifier-based filtering
				const [modifier, rest] = currentWord.split(":");
				if (!rest) {
					// If no rest, suggest all classes with modifier
					filtered = tailwindClasses.map(
						(className) => `${modifier}:${className}`,
					);
				} else {
					// Filter classes based on `rest` using dynamic first-letter matching
					const pattern = rest.toLowerCase();
					filtered = tailwindClasses
						.filter((className) => {
							const words = className.split("-");
							return words.every((word, index) => {
								const letter = pattern[index];
								return letter && word.startsWith(letter);
							});
						})
						.map((className) => `${modifier}:${className}`);
				}
			} else {
				// Handle dynamic first-letter matching for non-modifier classes
				const pattern = currentWord.toLowerCase();
				filtered = tailwindClasses.filter((className) => {
					const words = className.split("-");
					return words.every((word, index) => {
						const letter = pattern[index];
						return letter && word.startsWith(letter);
					});
				});
			}

			setSuggestions(filtered);
			setShowSuggestions(filtered.length > 0);
			setActiveSuggestionIndex(0); // Reset active index
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	}, 300);


	// Scroll active suggestion into view
	useEffect(() => {
		if (activeSuggestionRef.current) {
			activeSuggestionRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}, [activeSuggestionIndex]);

	// Handle keyboard navigation for suggestions
	const handleKeyDown = (e) => {
		if (e.key === "ArrowDown") {
			setActiveSuggestionIndex((prevIndex) =>
				prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex,
			);
		} else if (e.key === "ArrowUp") {
			setActiveSuggestionIndex((prevIndex) =>
				prevIndex > 0 ? prevIndex - 1 : prevIndex,
			);
		} else if (e.key === "Enter" && suggestions.length > 0) {
			e.preventDefault();
			selectSuggestion(suggestions[activeSuggestionIndex]);
		}
	};

	// Handle suggestion selection
	const selectSuggestion = (suggestion) => {
		const words = inputValue.split(" ");
		words.pop(); // Remove the current word
		const updatedValue = [...words, suggestion].join(" "); // Replace with suggestion
		setInputValue(updatedValue); // Update the input value
		update(updatedValue); // Notify parent of the selection
		setShowSuggestions(false); // Hide suggestions
		setActiveSuggestionIndex(0);
		inputRef.current.focus(); // Keep focus on the input
	};

	// Handle suggestion click
	const handleSuggestionClick = (suggestion) => {
		selectSuggestion(suggestion);
	};

	return (
		<div className="relative w-full">
			<label htmlFor="">Add Classes</label>
			<textarea
				ref={inputRef}
				value={inputValue}
				onChange={(e) => handleInputChange(e)} // Default textarea behavior
				onKeyDown={handleKeyDown}
				placeholder="Type Tailwind classes..."
				className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
				aria-expanded={showSuggestions}
				aria-owns="suggestion-list"
			/>
			{showSuggestions && (
				<ul
					id="suggestion-list"
					className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border rounded shadow-md z-10"
					role="listbox"
				>
					{suggestions.map((suggestion, index) => (
						<li
							key={index}
							ref={index === activeSuggestionIndex ? activeSuggestionRef : null}
							onClick={() => handleSuggestionClick(suggestion)}
							className={`p-2 cursor-pointer ${
								index === activeSuggestionIndex
									? "bg-blue-100"
									: "hover:bg-gray-100"
							}`}
							aria-selected={index === activeSuggestionIndex}
							role="option"
						>
							{suggestion}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TailwindInput;
