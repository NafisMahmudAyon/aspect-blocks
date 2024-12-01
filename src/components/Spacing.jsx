import { useState, useEffect } from "react";

const Spacing = ({ update, val, breakpoint = "" }) => {
	// State to hold the spacing value and unit
	const [spacing, setSpacing] = useState("");
	const [unit, setUnit] = useState("px");

	// Effect to parse the initial val and set the spacing and unit
	useEffect(() => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const regex = new RegExp(
			`${prefix}tracking-\\[([0-9]+(?:\\.[0-9]*)?)(px|rem|em|vw|vh|%)\\]`
		);
		const match = val?.match(regex);

		if (match) {
			setSpacing(match[1]); // Extract spacing value
			setUnit(match[2]); // Extract unit
		} else {
			// If no breakpoint-specific match is found, fallback to default plain text-[...] class
			const fallbackMatch = val?.match(
				/tracking-\[([0-9]+(?:\.[0-9]*)?)(px|rem|em|vw|vh|%)\]/
			);
			if (fallbackMatch) {
				setSpacing(fallbackMatch[1]);
				setUnit(fallbackMatch[2]);
			} else {
				// Reset size and unit if no valid class is found
				setSpacing("");
				setUnit("px");
			}
		}
	}, [val, breakpoint]);

	// Handle changes in the letter spacing input
	const handleSpacingChange = (e) => {
		const newSpacing = e.target.value;
		if (newSpacing === "" || /^[0-9]+(\.[0-9]*)?$/.test(newSpacing)) {
			setSpacing(newSpacing);
			updateClasses(newSpacing, unit);
		}
	};

	// Handle changes in the unit select
	const handleUnitChange = (e) => {
		const newUnit = e.target.value;
		setUnit(newUnit);
		updateClasses(spacing, newUnit);
	};

	// Update the class string in val
	const updateClasses = (newSpacing, newUnit) => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const newClass = newSpacing ?`${prefix}tracking-[${newSpacing}${newUnit}]` : "";

		// Replace predefined tracking classes or existing custom tracking-[...] class
		const predefinedClasses = [
			"tracking-tighter",
			"tracking-tight",
			"tracking-normal",
			"tracking-wide",
			"tracking-wider",
			"tracking-widest",
		];
		const updatedVal = val
			.split(" ") // Split existing classes into an array
			.filter(
				(cls) =>
					!(
						cls.startsWith(`${prefix}tracking-[`) ||
						(!prefix && cls.startsWith("tracking-["))
					) && !predefinedClasses.includes(cls) // Remove existing tracking classes
			)
			.concat(newClass) // Add the new tracking-[...] class
			.filter(Boolean)
			.join(" "); // Join classes back into a string

		update(updatedVal.trim());
	};

	return (
		<div className="flex items-center justify-between mb-1 text-xs text-primary-800">
			<label htmlFor="letter-spacing" className="label">Spacing
			</label>
			<div className="relative w-[70%] border border-primary-900 rounded-md flex items-center justify-end">
				<input
					type="text"
					name="letter-spacing"
					id="classes-form-letter-spacing"
					className="!bg-transparent !border-none text-primary-800 px-1 py-1 w-full !outline-none text-[11px] flex-1"
					value={spacing}
					placeholder="0"
					onChange={handleSpacingChange}
				/>
				<label htmlFor="unit-letter-spacing" className="current-unit pl-1">
					<select
						className="!bg-transparent !border-none !outline-none focus:outline-none text-primary-800"
						id="unit-letter-spacing"
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

export default Spacing;
