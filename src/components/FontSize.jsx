import React, { useState, useEffect } from "react";

const FontSize = ({ update, val, breakpoint = "" }) => {
	// State to hold the size and unit
	const [size, setSize] = useState("");
	const [unit, setUnit] = useState("px");

	// Effect to parse the initial `val` and set the size and unit
	useEffect(() => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add the breakpoint prefix if provided
		const regex = new RegExp(
			`${prefix}text-\\[([0-9]+(?:\\.[0-9]*)?)(px|rem|em|vw|vh|%)\\]`,
		);

		const match = val?.match(regex);

		if (match) {
			setSize(match[1]); // Extract size
			setUnit(match[2]); // Extract unit
		} else {
			// If no breakpoint-specific match is found, fallback to default plain `text-[...]` class
			const fallbackMatch = val?.match(
				/text-\[([0-9]+(?:\.[0-9]*)?)(px|rem|em|vw|vh|%)\]/,
			);

			if (fallbackMatch) {
				setSize(fallbackMatch[1]);
				setUnit(fallbackMatch[2]);
			} else {
				// Reset size and unit if no valid class is found
				setSize("");
				setUnit("px");
			}
		}
	}, [val, breakpoint]);

	// Handle changes in the font size input
	const handleSizeChange = (e) => {
		const newSize = e.target.value;

		// Allow empty string, whole numbers, and numbers with one optional decimal point
		if (newSize === "" || /^[0-9]+(\.[0-9]*)?$/.test(newSize)) {
			setSize(newSize);
			updateClasses(newSize, unit);
		}
	};

	// Handle changes in the unit select
	const handleUnitChange = (e) => {
		const newUnit = e.target.value;
		setUnit(newUnit);
		updateClasses(size, newUnit);
	};

	const updateClasses = (newSize, newUnit) => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add the breakpoint prefix if provided
		const newClass = newSize ? `${prefix}text-[${newSize}${newUnit}]` : "";

		const updatedVal = val
			.split(" ") // Split existing classes into an array
			.filter(
				(cls) =>
					!(
						cls.startsWith(`${prefix}text-[`) ||
						(!prefix && cls.startsWith("text-["))
					),
			) // Remove existing text-[...] classes for current breakpoint or default
			.concat(newClass) // Add the new class if not empty
			.filter(Boolean) // Remove empty strings
			.join(" "); // Join classes back into a string

		update(updatedVal);
	};

	return (
		<div className="flex items-center justify-between mb-1 text-xs text-primary-800">
			<label htmlFor="font-size" className="label">
				Size
			</label>
			<div className="relative w-[70%] border border-primary-900 rounded-md flex items-center justify-end">
				<input
					type="text"
					name="font-size"
					id="classes-form-font-size"
					className="!bg-transparent !border-none text-primary-800 px-1 py-1 w-full !outline-none text-[11px] flex-1"
					value={size}
					placeholder="16"
					onChange={handleSizeChange}
				/>
				<label htmlFor="unit-font-size" className="current-unit pl-1">
					<select
						className="!bg-transparent !border-none !outline-none focus:outline-none text-primary-800"
						id="unit-font-size"
						tabIndex="-1"
						value={unit}
						onChange={handleUnitChange}
					>
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

export default FontSize;
