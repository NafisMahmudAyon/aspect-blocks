import { useState, useEffect } from "react";

const TextTransform = ({ update, val, breakpoint = "" }) => {
	// State to hold the selected text transform
	const [transform, setTransform] = useState("");

	// Transform options and their corresponding Tailwind classes
	const transformOptions = {
		uppercase: "uppercase",
		lowercase: "lowercase",
		capitalize: "capitalize",
		"normal-case": "normal-case",
	};

	// Effect to extract and set the initial transform from `val`
	useEffect(() => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const regex = new RegExp(
			`${prefix}(uppercase|lowercase|capitalize|normal-case)`
		);
		const match = val?.match(regex);

		if (match) {
			setTransform(match[1]); // Extract transform value (e.g., "uppercase")
		} else {
			const fallbackMatch = val?.match(
				/(uppercase|lowercase|capitalize|normal-case)/
			);

			if (fallbackMatch) {
				setTransform(fallbackMatch[1]);
			} else {
				setTransform(""); // Reset if no match is found
			}
		}
	}, [val]);

	// Handle transform change
	const handleTransformChange = (newTransform) => {
		setTransform(newTransform);
		updateVal(newTransform);
	};

	const updateVal = (newTransform) => {
		// Construct the new Tailwind class with the current breakpoint
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`;
		const newClass = newTransform
			? `${prefix}${transformOptions[newTransform]}`
			: "";

		// Replace or append the new transform class for the current breakpoint
		const updatedClasses = val
			.split(" ")
			.filter(
				(cls) =>
					!(
						cls.startsWith(`${prefix}`) &&
						Object.values(transformOptions).some((transformClass) =>
							cls.endsWith(transformClass)
						)
					)
			)
			.concat(newClass)
			.filter(Boolean)
			.join(" ");

		// Update the parent with the new class string
		update(updatedClasses.trim());
	};

	return (
		<div className="flex items-center justify-between mb-1 text-xs text-primary-800">
			<label className="label">Transform</label>
			<div className="flex space-x-2">
				{Object.keys(transformOptions).map((key) => (
					<button
						key={key}
						className={`p-1 border rounded-md text-[11px] ${
							transform === key ? "bg-primary-800 text-white" : "bg-transparent"
						}`}
						onClick={() => handleTransformChange(key)}
						title={key}>
						{/* Use icons for each transform option */}
						{key === "uppercase" && <span>🔠</span>} {/* Uppercase Icon */}
						{key === "lowercase" && <span>🔡</span>} {/* Lowercase Icon */}
						{key === "capitalize" && <span>🔤</span>} {/* Capitalize Icon */}
						{key === "normal-case" && <span>🔓</span>} {/* Normal-Case Icon */}
					</button>
				))}
			</div>
		</div>
	);
};

export default TextTransform;
