import { useState, useEffect } from "react";

const TextAlign = ({ update, val, breakpoint = "" }) => {
	// State to hold the selected alignment
	const [alignment, setAlignment] = useState("");

	// Alignment options and their corresponding Tailwind classes
	const alignOptions = {
		left: "text-left",
		center: "text-center",
		right: "text-right",
		justify: "text-justify",
	};

	// Effect to extract and set the initial alignment for the specified breakpoint
	useEffect(() => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const regex = new RegExp(`${prefix}text-(left|center|right|justify)`);
		const match = val?.match(regex);

		if (match) {
			setAlignment(match[1]); // Extract alignment value (e.g., "left", "center")
		} else {
			const fallbackMatch = val?.match(/text-(left|center|right|justify)\]/);

			if (fallbackMatch) {
				setAlignment(fallbackMatch[1]);
			} else {
				// Reset size and unit if no valid class is found
				setAlignment(""); // Reset if no match is found
			}
		}
	}, [val, breakpoint]);

	// Handle alignment change
	const handleAlignmentChange = (newAlignment) => {
		setAlignment(newAlignment);
		updateVal(newAlignment);
	};
	const updateVal = (newAlignment) => {
		// Construct the new Tailwind class with the current breakpoint
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const newClass = newAlignment
			? `${prefix}${alignOptions[newAlignment]}`
			: "";

		// Replace or append the new alignment class for the current breakpoint
		const updatedClasses = val
			.split(" ") // Split classes into an array
			.filter(
				(cls) =>
					!(
						cls.startsWith(`${prefix}text-`) &&
						Object.values(alignOptions).some((alignClass) =>
							cls.endsWith(alignClass)
						)
					) // Remove existing alignment for the breakpoint
			)
			.concat(newClass) // Add the new class
			.filter(Boolean) // Remove existing alignment for the breakpoint
			.join(" "); // Join back into a string

		// Update the parent with the new class string
		update(updatedClasses.trim());
	};

	return (
		<div className="flex items-center justify-between mb-1 text-xs text-primary-800">
			<label className="label">Align
			</label>
			<div className="flex space-x-2">
				{Object.keys(alignOptions).map((key) => (
					<button
						key={key}
						className={`p-1 border rounded-md text-[11px] ${
							alignment === key ? "bg-primary-800 text-white" : "bg-transparent"
						}`}
						onClick={() => handleAlignmentChange(key)}
						title={`Align ${key}`}>
						{/* Use icons for each alignment option */}
						{key === "left" && <span>⬅️</span>} {/* Left Align Icon */}
						{key === "center" && <span>⬜</span>} {/* Center Align Icon */}
						{key === "right" && <span>➡️</span>} {/* Right Align Icon */}
						{key === "justify" && <span>📑</span>} {/* Justify Align Icon */}
					</button>
				))}
			</div>
		</div>
	);
};

export default TextAlign;
