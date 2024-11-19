import React, { useState, useEffect } from "react";

const FontSize = ({ update, val }) => {
	// State to hold the size and unit
	const [size, setSize] = useState("");
	const [unit, setUnit] = useState("px");

	// Effect to parse the initial `val` and set the size and unit
	useEffect(() => {
		if (val) {
			const match = val.match(/text-\[(\d+)(px|rem|em|vw|vh|%)\]/);
			if (match) {
				setSize(match[1]);
				setUnit(match[2]);
			}
		}
	}, [val]);

	// Handle changes in the font size input
	const handleSizeChange = (e) => {
		const newSize = e.target.value;
		setSize(newSize);
		updateClasses(newSize, unit);
	};

	// Handle changes in the unit select
	const handleUnitChange = (e) => {
		const newUnit = e.target.value;
		setUnit(newUnit);
		updateClasses(size, newUnit);
	};

	// Update the classes string
	const updateClasses = (newSize, newUnit) => {
		const newClasses = `text-[${newSize}${newUnit}]`;
		update(newClasses);
	};

	return (
		<div className="flex items-center justify-between mb-1 text-xs text-primary-800">
			<span className="label">Size</span>
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
