import { useState, useEffect } from "react";

const WordBreak = ({ update, val, breakpoint = "" }) => {
	// State to hold the selected word-break value
	const [wordBreak, setWordBreak] = useState("");

	// Mapping for Tailwind word-break classes
	const wordBreakMap = {
		"break-normal": "normal",
		"break-words": "words",
		"break-all": "all",
		"break-keep": "keep",
	};

	// Effect to extract and set the initial word-break value for the current breakpoint
	useEffect(() => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const regex = new RegExp(
			`${prefix}(break-normal|break-words|break-all|break-keep)`
		);
		const match = val?.match(regex);

		if (match) {
			const matchedBreak = match[1];
			setWordBreak(matchedBreak);
		} else {
			// Reset word-break if no valid class is found
			setWordBreak("");
		}
	}, [val, breakpoint]);

	// Handle changes in the word-break selection
	const handleWordBreakChange = (e) => {
		const newBreak = e.target.value;
		setWordBreak(newBreak);
		updateVal(newBreak);
	};

	const updateVal = (newBreak) => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const tailwindClass = newBreak ? `${prefix}${newBreak}` : "";

		// Replace or append the new word-break class for the current breakpoint
		const updatedClasses = val
			.split(" ") // Split classes into an array
			.filter(
				(cls) =>
					!(
						cls.startsWith(`${prefix}break-`) ||
						(!prefix && cls.startsWith("break-"))
					) // Remove existing word-break for the breakpoint
			)
			.concat(tailwindClass) // Add the new class
			.filter(Boolean) // Filter out empty strings
			.join(" "); // Join back into a string

		// Update the parent with the new class string
		update(updatedClasses);
	};

	return (
		<div className="flex items-center justify-between mb-1 text-xs text-primary-800">
			<label htmlFor="word-break" className="label">
				Word Break
			</label>
			<div className="relative w-[70%] border border-primary-900 rounded-md">
				<select
					className="w-full bg-transparent border-none outline-none focus:outline-none text-primary-800 py-1 text-[11px]"
					id="word-break"
					value={wordBreak}
					onChange={handleWordBreakChange}>
					<option value="">Select Word Break</option>
					<option value="break-normal">Normal</option>
					<option value="break-words">Words</option>
					<option value="break-all">All</option>
					<option value="break-keep">Keep</option>
				</select>
			</div>
		</div>
	);
};

export default WordBreak;
