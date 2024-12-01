import { useState, useEffect } from "react";

const Weight = ({ update, val, breakpoint = "" }) => {
	// State to hold the selected font weight
	const [weight, setWeight] = useState("");

	// Mapping for Tailwind font weight names and numeric values
	const weightMap = {
		"[100]": "thin",
		"[200]": "extralight",
		"[300]": "light",
		"[400]": "normal",
		"[500]": "medium",
		"[600]": "semibold",
		"[700]": "bold",
		"[800]": "extrabold",
		"[900]": "black",
	};

	// Reverse mapping to extract weights
	const reverseWeightMap = Object.entries(weightMap).reduce(
		(acc, [key, value]) => {
			acc[value] = key;
			return acc;
		},
		{}
	);

	// Effect to extract and set the initial font weight for the current breakpoint
	useEffect(() => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const regex = new RegExp(
			`${prefix}font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black|\\[\\d{3}\\])`
		);
		const match = val?.match(regex);

		if (match) {
			const matchedWeight = match[1];
			// Set the human-readable weight name (e.g., "thin", "bold")
			setWeight(
				Object.keys(weightMap).includes(matchedWeight)
					? weightMap[matchedWeight]
					: matchedWeight
			);
		} else {
			const fallbackMatch = val?.match(
				/font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black|\[\d{3}\])/
			);

			if (fallbackMatch) {
				const matchedWeight = fallbackMatch[1];
				// Set the human-readable weight name (e.g., "thin", "bold")
				setWeight(
					Object.keys(weightMap).includes(matchedWeight)
						? weightMap[matchedWeight]
						: matchedWeight
				);
			} else {
				// Reset size and unit if no valid class is found
				setWeight("");
			}
		}
	}, [val, breakpoint]);

	// Handle changes in the font weight
	const handleWeightChange = (e) => {
		const newWeight = e.target.value;
		setWeight(newWeight);
		updateVal(newWeight);
	};

	const updateVal = (newWeight) => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`; // Add breakpoint prefix if provided
		const tailwindClass = newWeight ? `${prefix}font-${newWeight}` : "";

		// Replace or append the new font weight for the current breakpoint
		const updatedClasses = val
			.split(" ") // Split classes into an array
			.filter(
				(cls) =>
					!(
						cls.startsWith(`${prefix}font-`) ||
						(!prefix && cls.startsWith("font-"))
					) // Remove existing weight for the breakpoint
			)
			.concat(tailwindClass) // Add the new class
			.filter(Boolean) // Filter
			.join(" "); // Join back into a string

		// Update the parent with the new class string
		update(updatedClasses);
	};

	return (
		<div className="flex items-center justify-between mb-1 text-xs text-primary-800">
			<label htmlFor="font-weight" className="label">Weight
			</label>
			<div className="relative w-[70%] border border-primary-900 rounded-md">
				<select
					className="w-full bg-transparent border-none outline-none focus:outline-none text-primary-800 py-1 text-[11px]"
					id="font-weight"
					value={weight}
					onChange={handleWeightChange}>
					<option value="">Select Weight</option>
					<option value="thin">Thin (100)</option>
					<option value="extralight">Extra Light (200)</option>
					<option value="light">Light (300)</option>
					<option value="normal">Normal (400)</option>
					<option value="medium">Medium (500)</option>
					<option value="semibold">Semi Bold (600)</option>
					<option value="bold">Bold (700)</option>
					<option value="extrabold">Extra Bold (800)</option>
					<option value="black">Black (900)</option>
				</select>
			</div>
		</div>
	);
};

export default Weight;
