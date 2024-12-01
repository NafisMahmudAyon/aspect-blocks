import { useState, useEffect } from "react";

const TextDecoration = ({ update, val, breakpoint = "" }) => {
	// State to hold the selected text decoration
	const [decoration, setDecoration] = useState("");

	// Decoration options and their corresponding Tailwind classes
	const decorationOptions = {
		underline: "underline",
		overline: "overline",
		"line-through": "line-through",
		"no-underline": "no-underline",
	};

	// Effect to extract and set the initial decoration from `val`
	useEffect(() => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const regex = new RegExp(
			`${prefix}(underline|overline|line-through|no-underline)`
		);
		const match = val?.match(regex);

		if (match) {
			setDecoration(match[1]); // Extract alignment value (e.g., "left", "center")
		} else {
			const fallbackMatch = val?.match(
				/(underline|overline|line-through|no-underline)/
			);

			if (fallbackMatch) {
				setDecoration(fallbackMatch[1]);
			} else {
				// Reset size and unit if no valid class is found
				setDecoration(""); // Reset if no match is found
			}
		}
	}, [val]);

	// Handle decoration change
	const handleDecorationChange = (newDecoration) => {
		setDecoration(newDecoration);
updateVal(newDecoration);
	};

	const updateVal = (newDecoration) => {
		// Construct the new Tailwind class with the current breakpoint
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const newClass = newDecoration
			? `${prefix}${decorationOptions[newDecoration]}`
			: "";
		// const newClass = decorationOptions[newDecoration];

		// Replace or append the new alignment class for the current breakpoint
		const updatedClasses = val
			.split(" ") // Split classes into an array
			.filter(
				(cls) =>
					!(
						cls.startsWith(`${prefix}`) &&
						Object.values(decorationOptions).some((decorationClass) =>
							cls.endsWith(decorationClass)
						)
					) // Remove existing alignment for the breakpoint
			)
			.concat(newClass) // Add the new class
			.filter(Boolean) // Remove existing alignment for the breakpoint
			.join(" "); // Join back into a string

		// Update the parent with the new class string
		update(updatedClasses.trim());
	}

	return (
		<div className="flex items-center justify-between mb-1 text-xs text-primary-800">
			<label className="label">Decoration</label>
			<div className="flex space-x-2">
				{Object.keys(decorationOptions).map((key) => (
					<button
						key={key}
						className={`p-1 border rounded-md text-[11px] ${
							decoration === key
								? "bg-primary-800 text-white"
								: "bg-transparent"
						}`}
						onClick={() => handleDecorationChange(key)}
						title={key}>
						{/* Use icons for each decoration option */}
						{key === "underline" && <span>🔽</span>} {/* Underline Icon */}
						{key === "overline" && <span>🔼</span>} {/* Overline Icon */}
						{key === "line-through" && <span>➖</span>}{" "}
						{/* Line-Through Icon */}
						{key === "no-underline" && <span>❌</span>}{" "}
						{/* No-Underline Icon */}
					</button>
				))}
			</div>
		</div>
	);
};

export default TextDecoration;
