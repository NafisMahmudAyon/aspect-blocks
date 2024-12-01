import { useState, useEffect } from "react";

const Display = ({ update, val, breakpoint = "" }) => {
	// State to hold the selected display value
	const [display, setDisplay] = useState("");

	// List of display options
	const displayOptions = [
		"block",
		"inline-block",
		"inline",
		"flex",
		"inline-flex",
		"table",
		"inline-table",
		"table-caption",
		"table-cell",
		"table-column",
		"table-column-group",
		"table-footer-group",
		"table-header-group",
		"table-row-group",
		"table-row",
		"flow-root",
		"grid",
		"inline-grid",
		"contents",
		"list-item",
		"hidden",
	];

	// Effect to extract and set the initial display value for the current breakpoint
	useEffect(() => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const regex = new RegExp(`${prefix}(${displayOptions.join("|")})`);
		const match = val?.match(regex);

		if (match) {
			setDisplay(match[1]);
		} else {
			setDisplay(""); // Reset display if no valid class is found
		}
	}, [val, breakpoint]);

	// Handle changes in the display selection
	const handleDisplayChange = (e) => {
		const newDisplay = e.target.value;
		setDisplay(newDisplay);
		updateVal(newDisplay);
	};

	const updateVal = (newDisplay) => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const tailwindClass = newDisplay ? `${prefix}${newDisplay}` : "";

		// Replace or append the new display class for the current breakpoint
		const updatedClasses = val
			.split(" ") // Split classes into an array
			.filter(
				(cls) =>
					!(
						cls.startsWith(`${prefix}`) &&
						displayOptions.some((option) => cls.endsWith(option))
					) // Remove existing display class for the breakpoint
			)
			.concat(tailwindClass) // Add the new class
			.filter(Boolean) // Filter out empty strings
			.join(" "); // Join back into a string

		// Update the parent with the new class string
		update(updatedClasses);
	};

	return (
		<div className="flex items-center justify-between mb-1 text-xs text-primary-800">
			<label htmlFor="display" className="label">
				{breakpoint ? `${breakpoint.toUpperCase()} Display` : "Display"}
			</label>
			<div className="relative w-[70%] border border-primary-900 rounded-md">
				<select
					className="w-full bg-transparent border-none outline-none focus:outline-none text-primary-800"
					id="display"
					value={display}
					onChange={handleDisplayChange}>
					<option value="">Select Display</option>
					{displayOptions.map((option) => (
						<option key={option} value={option}>
							{option.charAt(0).toUpperCase() + option.slice(1)}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default Display;
