import { useState, useEffect } from "react";

const LineHeight = ({ update, val, breakpoint="" }) => {
	// State to hold the line height value and unit
	const [lineHeight, setLineHeight] = useState("");
	const [unit, setUnit] = useState("px");

	// Effect to parse the initial `val` and set the line height and unit
	useEffect(() => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`;
		const regex = new RegExp(
			`${prefix}leading-\\[([0-9]+(?:\\.[0-9]*)?)(px|rem|em|vw|vh|%)\\]`
		);
		const match = val?.match(regex);

		if (match) {
			setLineHeight(match[1]); // Extract spacing value
			setUnit(match[2]); // Extract unit
		} else {
			// If no breakpoint-specific match is found, fallback to default plain text-[...] class
			const fallbackMatch = val?.match(
				/leading-\[([0-9]+(?:\.[0-9]*)?)(px|rem|em|vw|vh|%)\]/
			);
			if (fallbackMatch) {
				setLineHeight(fallbackMatch[1]);
				setUnit(fallbackMatch[2]);
			} else {
				// Reset size and unit if no valid class is found
				setLineHeight("");
				setUnit("px");
			}
		}
	}, [val]);

	// Handle changes in the line height input
	const handleLineHeightChange = (e) => {
		const newLineHeight = e.target.value;
		if (newLineHeight === "" || /^[0-9]+(\.[0-9]*)?$/.test(newLineHeight)) {
			setLineHeight(newLineHeight);
			updateClasses(newLineHeight, unit);
		}
	};

	// Handle changes in the unit select
	const handleUnitChange = (e) => {
		const newUnit = e.target.value;
		setUnit(newUnit);
		updateClasses(lineHeight, newUnit, breakpoint);
	};

	// Update the class string in `val`
	const updateClasses = (newLineHeight, newUnit) => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided

		const newClass = newLineHeight
			? `${prefix}leading-[${newLineHeight}${newUnit}]`
			: "";

		// Predefined leading classes
		const predefinedClasses = [
			"leading-3",
			"leading-4",
			"leading-5",
			"leading-6",
			"leading-7",
			"leading-8",
			"leading-9",
			"leading-10",
			"leading-none",
			"leading-tight",
			"leading-snug",
			"leading-normal",
			"leading-relaxed",
			"leading-loose",
		];

		const updatedVal = val
			.split(" ") // Split existing classes into an array
			.filter(
				(cls) =>
					!(
						cls.startsWith(`${prefix}leading-[`) ||
						(!prefix && cls.startsWith("leading-["))
					) && !predefinedClasses.includes(cls) // Remove existing tracking classes
			)
			.concat(newClass) // Add the new `leading-[...]` class
			.filter(Boolean)
			.join(" "); // Join classes back into a string

		update(updatedVal.trim());
	};

	return (
		<div className="flex items-center justify-between mb-1 text-xs text-primary-800">
			<label htmlFor="line-height" className="label">
				Line Height
			</label>
			<div className="relative w-[70%] border border-primary-900 rounded-md flex items-center justify-end">
				<input
					type="text"
					name="line-height"
					id="classes-form-line-height"
					className="!bg-transparent !border-none text-primary-800 px-1 py-1 w-full !outline-none text-[11px] flex-1"
					value={lineHeight}
					placeholder="0"
					onChange={handleLineHeightChange}
				/>
				<label htmlFor="unit-line-height" className="current-unit pl-1">
					<select
						className="!bg-transparent !border-none !outline-none focus:outline-none text-primary-800"
						id="unit-line-height"
						tabIndex="-1"
						value={unit}
						onChange={handleUnitChange}>
						<option value="px">px</option>
						<option value="rem">rem</option>
						<option value="em">em</option>
						<option value="vw">vw</option>
						<option value="vh">vh</option>
						<option value="%">%</option>
					</select>
				</label>
			</div>
		</div>
	);
};

export default LineHeight;
