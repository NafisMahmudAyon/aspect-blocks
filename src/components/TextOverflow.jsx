import { useState, useEffect } from "react";

const TextOverflow = ({ update, val, breakpoint = "" }) => {
	// State to hold the selected text overflow style
	const [overflow, setOverflow] = useState("");

	// Mapping for Tailwind text overflow classes
	const overflowOptions = {
		truncate: "Truncate",
		"text-ellipsis": "Ellipsis",
		"text-clip": "Clip",
	};

	// Effect to extract and set the initial text overflow for the current breakpoint
	useEffect(() => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const regex = new RegExp(`${prefix}(truncate|text-ellipsis|text-clip)`);
		const match = val?.match(regex);

		if (match) {
			setOverflow(match[1]); // Set the matched overflow value
		} else {
			const fallbackMatch = val?.match(/(truncate|text-ellipsis|text-clip)/);

			if (fallbackMatch) {
				setOverflow(fallbackMatch[1]);
			} else {
				setOverflow(""); // Reset if no match is found
			}
		}
	}, [val, breakpoint]);

	// Handle changes in the text overflow
	const handleOverflowChange = (e) => {
		const newOverflow = e.target.value;
		setOverflow(newOverflow);
		updateVal(newOverflow);
	};

	const updateVal = (newOverflow) => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const tailwindClass = newOverflow ? `${prefix}${newOverflow}` : "";

		// Replace or append the new text overflow class for the current breakpoint
		const updatedClasses = val
			.split(" ") // Split classes into an array
			.filter(
				(cls) =>
					!(
						cls.startsWith(`${prefix}truncate`) ||
						cls.startsWith(`${prefix}text-ellipsis`) ||
						cls.startsWith(`${prefix}text-clip`)
					)
			)
			.concat(tailwindClass) // Add the new class
			.filter(Boolean) // Remove empty strings
			.join(" "); // Join back into a string

		// Update the parent with the new class string
		update(updatedClasses);
	};

	return (
		<div className="flex items-center justify-between mb-1 text-xs text-primary-800">
			<label htmlFor="text-overflow" className="label">
				Overflow
			</label>
			<div className="relative w-[70%] border border-primary-900 rounded-md">
				<select
					className="w-full bg-transparent border-none outline-none focus:outline-none text-primary-800 py-1 text-[11px]"
					id="text-overflow"
					value={overflow}
					onChange={handleOverflowChange}>
					<option value="">Select Overflow</option>
					{Object.entries(overflowOptions).map(([key, label]) => (
						<option key={key} value={key}>
							{label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default TextOverflow;
