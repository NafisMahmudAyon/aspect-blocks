import { useState, useEffect } from "react";

const Width = ({ update, val, breakpoint = "" }) => {
	// State to hold the width value and unit
	const [width, setWidth] = useState("");
	const [unit, setUnit] = useState("px");

	// Effect to parse the initial `val` and set the width and unit
	useEffect(() => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`;
		const regex = new RegExp(
			`${prefix}w-\\[([0-9]+(?:\\.[0-9]*)?)(px|rem|em|vw|vh|%)\\]`
		);
		const match = val?.match(regex);

		if (match) {
			setWidth(match[1]); // Extract width value
			setUnit(match[2]); // Extract unit
		} else {
			// If no breakpoint-specific match is found, fallback to predefined or plain custom class
			const fallbackMatch = val?.match(
				/w-\[([0-9]+(?:\.[0-9]*)?)(px|rem|em|vw|vh|%)\]/
			);
			if (fallbackMatch) {
				setWidth(fallbackMatch[1]);
				setUnit(fallbackMatch[2]);
			} else {
				// Reset size and unit if no valid class is found
				setWidth("");
				setUnit("px");
			}
		}
	}, [val]);

	// Handle changes in the width input
	const handleWidthChange = (e) => {
		const newWidth = e.target.value;
		if (newWidth === "" || /^[0-9]+(\.[0-9]*)?$/.test(newWidth)) {
			setWidth(newWidth);
			updateClasses(newWidth, unit);
		}
	};

	// Handle changes in the unit select
	const handleUnitChange = (e) => {
		const newUnit = e.target.value;
		setUnit(newUnit);
		updateClasses(width, newUnit);
	};

	// Update the class string in `val`
	const updateClasses = (newWidth, newUnit) => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided

		const newClass = newWidth ? `${prefix}w-[${newWidth}${newUnit}]` : "";

		// Predefined width classes
		const predefinedClasses = [
			"w-0",
			"w-px",
			"w-0.5",
			"w-1",
			"w-1.5",
			"w-2",
			"w-2.5",
			"w-3",
			"w-3.5",
			"w-4",
			"w-5",
			"w-6",
			"w-7",
			"w-8",
			"w-9",
			"w-10",
			"w-11",
			"w-12",
			"w-14",
			"w-16",
			"w-20",
			"w-24",
			"w-28",
			"w-32",
			"w-36",
			"w-40",
			"w-44",
			"w-48",
			"w-52",
			"w-56",
			"w-60",
			"w-64",
			"w-72",
			"w-80",
			"w-96",
			"w-auto",
			"w-full",
			"w-screen",
			"w-fit",
			"w-min",
			"w-max",
			// Fractional widths
			"w-1/2",
			"w-1/3",
			"w-2/3",
			"w-1/4",
			"w-3/4",
			"w-1/5",
			"w-2/5",
			"w-3/5",
			"w-4/5",
			"w-1/6",
			"w-5/6",
			"w-1/12",
			"w-11/12",
		];

		const updatedVal = val
			.split(" ") // Split existing classes into an array
			.filter(
				(cls) =>
					!(
						cls.startsWith(`${prefix}w-[`) ||
						(!prefix && cls.startsWith("w-["))
					) && !predefinedClasses.includes(cls) // Remove existing width classes
			)
			.concat(newClass) // Add the new `w-[...]` class
			.filter(Boolean)
			.join(" "); // Join classes back into a string

		update(updatedVal.trim());
	};

	return (
		<div className="flex items-center justify-between mb-1 text-xs text-primary-800">
			<label htmlFor="width" className="label">
				Width
			</label>
			<div className="relative w-[70%] border border-primary-900 rounded-md flex items-center justify-end">
				<input
					type="text"
					name="width"
					id="classes-form-width"
					className="!bg-transparent !border-none text-primary-800 px-1 py-1 w-full !outline-none text-[11px] flex-1"
					value={width}
					placeholder="0"
					onChange={handleWidthChange}
				/>
				<label htmlFor="unit-width" className="current-unit pl-1">
					<select
						className="!bg-transparent !border-none !outline-none focus:outline-none text-primary-800"
						id="unit-width"
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

export default Width;
