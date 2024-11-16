import React, { useState, useEffect, useRef } from "react";
import { tailwindCSS } from "./tailwindClasses";

const TailwindInput = () => {
	const [inputValue, setInputValue] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const inputRef = useRef(null);

	// Using the commonTailwindClasses array from our previous context
	// const tailwindClasses = [
	// 	"container",
	// 	"flex",
	// 	"grid",
	// 	"block",
	// 	"inline",
	// 	"inline-block",
	// 	"m-1",
	// 	"m-2",
	// 	"m-3",
	// 	"m-4",
	// 	"p-1",
	// 	"p-2",
	// 	"p-3",
	// 	"p-4",
	// 	"bg-blue-500",
	// 	"text-white",
	// 	"text-black",
	// 	"bg-gray-100",
	// 	"text-sm",
	// 	"text-base",
	// 	"text-lg",
	// 	"text-xl",
	// 	"font-bold",
	// 	"flex-row",
	// 	"flex-col",
	// 	"justify-center",
	// 	"items-center",
	// 	"w-full",
	// 	"h-full",
	// 	"w-screen",
	// 	"h-screen",
	// ];

  const tailwindClasses = tailwindCSS;
  const tailwindModifiers = {
		default: [
			"hover",
			"focus",
			"focus-within",
			"focus-visible",
			"active",
			"visited",
			"target",
			"*",
			"has",
			"first",
			"last",
			"only",
			"odd",
			"even",
			"first-of-type",
			"last-of-type",
			"only-of-type",
			"empty",
			"disabled",
			"enabled",
			"checked",
			"indeterminate",
			"default",
			"required",
			"valid",
			"invalid",
			"in-range",
			"out-of-range",
			"placeholder-shown",
			"autofill",
			"read-only",
			"before",
			"after",
			"first-letter",
			"first-line",
			"marker",
			"selection",
			"file",
			"backdrop",
			"placeholder",
			"sm",
			"md",
			"lg",
			"xl",
			"2xl",
			"max-sm",
			"max-md",
			"max-lg",
			"max-xl",
			"max-2xl",
			"dark",
			"portrait",
			"landscape",
			"motion-safe",
			"motion-reduce",
			"contrast-more",
			"contrast-less",
			"print",
			"aria-checked",
			"aria-disabled",
			"aria-expanded",
			"aria-hidden",
			"aria-pressed",
			"aria-readonly",
			"aria-required",
			"aria-selected",
			"rtl",
			"ltr",
			"open",
		],
		arbitrary: ["min-[…]", "max-[…]", "supports-[…]", "aria-[…]", "data-[…]"],
		all: [
			"hover",
			"focus",
			"focus-within",
			"focus-visible",
			"active",
			"visited",
			"target",
			"*",
			"has",
			"first",
			"last",
			"only",
			"odd",
			"even",
			"first-of-type",
			"last-of-type",
			"only-of-type",
			"empty",
			"disabled",
			"enabled",
			"checked",
			"indeterminate",
			"default",
			"required",
			"valid",
			"invalid",
			"in-range",
			"out-of-range",
			"placeholder-shown",
			"autofill",
			"read-only",
			"before",
			"after",
			"first-letter",
			"first-line",
			"marker",
			"selection",
			"file",
			"backdrop",
			"placeholder",
			"sm",
			"md",
			"lg",
			"xl",
			"2xl",
			"min-[…]",
			"max-sm",
			"max-md",
			"max-lg",
			"max-xl",
			"max-2xl",
			"max-[…]",
			"dark",
			"portrait",
			"landscape",
			"motion-safe",
			"motion-reduce",
			"contrast-more",
			"contrast-less",
			"print",
			"supports-[…]",
			"aria-checked",
			"aria-disabled",
			"aria-expanded",
			"aria-hidden",
			"aria-pressed",
			"aria-readonly",
			"aria-required",
			"aria-selected",
			"aria-[…]",
			"data-[…]",
			"rtl",
			"ltr",
			"open",
		],
	}
  // console.log(tailwindCSS.length)

	// const handleInputChange = (e) => {
	// 	const value = e.target.value;
	// 	setInputValue(value);

	// 	// Get the last word being typed (after the last space)
	// 	const currentWord = value.split(" ").pop();

	// 	if (currentWord) {
	// 		const filtered = tailwindClasses.filter((className) =>
	// 			className.toLowerCase().startsWith(currentWord.toLowerCase()),
	// 		);
	// 		setSuggestions(filtered);
	// 		setShowSuggestions(filtered.length > 0);
	// 	} else {
	// 		setSuggestions([]);
	// 		setShowSuggestions(false);
	// 	}
	// };

  // const handleInputChange = (e) => {
	// 	const value = e.target.value;
	// 	setInputValue(value);

	// 	const currentWord = value.split(" ").pop();

	// 	if (currentWord) {
	// 		let filtered = tailwindClasses.filter((className) => {
	// 			// Handle modifiers using the imported modifiers array
	// 			// In your regex pattern, we need to escape the * character
	// 			const modifierMatch = currentWord.match(
	// 				new RegExp(
	// 					`^(${tailwindModifiers.all
	// 						.map((mod) =>
	// 							// Escape special regex characters, especially *
	// 							mod.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
	// 						)
	// 						.join("|")}):(.*)$`,
	// 				),
	// 			);

	// 			if (modifierMatch) {
	// 				const [_, modifier, utility] = modifierMatch;
	// 				// If there's a utility part after the modifier (like sm:bg-)
	// 				if (utility) {
	// 					return (
	// 						className.startsWith(`${modifier}:`) &&
	// 						className.toLowerCase().includes(utility.toLowerCase())
	// 					);
	// 				}
	// 				// If only modifier is typed (like sm:)
	// 				return className.startsWith(`${modifier}:`);
	// 			}

	// 			return className.toLowerCase().startsWith(currentWord.toLowerCase());
	// 		});

	// 		setSuggestions(filtered);
	// 		setShowSuggestions(filtered.length > 0);
	// 	} else {
	// 		setSuggestions([]);
	// 		setShowSuggestions(false);
	// 	}
	// };

//load on machine
  const handleInputChange = (e) => {
		const value = e.target.value;
		setInputValue(value);

		const currentWord = value.split(" ").pop();

		if (currentWord) {
			let filtered = [];

			// Check if input includes a modifier with colon
			if (currentWord.includes(":")) {
				// Split on colon to get modifier and rest of the class
				const [modifier, rest] = currentWord.split(":");

				// If there's just a modifier (eg: 'sm:'), suggest all base classes with that prefix
				if (!rest) {
					filtered = tailwindClasses.map(
						(className) => `${className}`,
					);
				} else {
					// If there's text after the modifier (eg: 'sm:bg-'), filter matching classes
					filtered = tailwindClasses
						.filter((className) =>
							className.toLowerCase().startsWith(rest.toLowerCase()),
						)
						.map((className) => `${modifier}:${className}`);
				}
			} else {
				// Existing pattern matching logic for non-modifier classes
				filtered = tailwindClasses.filter((className) => {
					// Your existing patterns and matching logic here
					return className.toLowerCase().startsWith(currentWord.toLowerCase());
				});
			}

			setSuggestions(filtered);
			setShowSuggestions(filtered.length > 0);
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	};








	const handleSuggestionClick = (suggestion) => {
		const words = inputValue.split(" ");
		words.pop(); // Remove the last word
		const newValue = [...words, suggestion].join(" ");
		setInputValue(newValue);
		setShowSuggestions(false);
		inputRef.current.focus();
	};

	return (
		<div className="relative w-full">
			<input
				ref={inputRef}
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Type Tailwind classes..."
				className="w-full p-2 border rounded"
			/>
			{showSuggestions && (
				<div className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border rounded shadow-lg">
					{suggestions.map((suggestion, index) => (
						<div
							key={index}
							onClick={() => handleSuggestionClick(suggestion)}
							className="p-2 hover:bg-gray-100 cursor-pointer"
						>
							{suggestion}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default TailwindInput;
