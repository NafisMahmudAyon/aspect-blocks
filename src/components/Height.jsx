import { useEffect, useState } from "react";

const Height = ({ update, val, breakpoint = "" }) => {
	const [height, setHeight] = useState("");
	const [unit, setUnit] = useState("px");

	useEffect(() => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`;
		const regex = new RegExp(
			`${prefix}h-\\[([0-9]+(?:\\.[0-9]*)?)(px|rem|em|vw|vh|%)\\]`
		);
		const maxRegex = new RegExp(
			`${prefix}max-h-\\[([0-9]+(?:\\.[0-9]*)?)(px|rem|em|vw|vh|%)\\]`
		);

		const matchHeight = val?.match(regex);
		const matchMaxHeight = val?.match(maxRegex);

		if (matchHeight && matchMaxHeight) {
			setHeight(matchHeight[1]);
			setUnit(matchHeight[2]);
		} else if (matchMaxHeight) {
			setHeight("");
			setUnit("px");
		} else {
			setHeight("");
			setUnit("px");
		}
	}, [val]);

	const handleHeightChange = (e) => {
		const newHeight = e.target.value;
		if (newHeight === "" || /^[0-9]+(\.[0-9]*)?$/.test(newHeight)) {
			setHeight(newHeight);
			updateClasses(newHeight, unit);
		}
	};

	const handleUnitChange = (e) => {
		const newUnit = e.target.value;
		setUnit(newUnit);
		updateClasses(height, newUnit);
	};

	const updateClasses = (newHeight, newUnit) => {
		const prefix = breakpoint === "desktop" ? "" : `${breakpoint}:`;
		const newClass = newHeight ? `${prefix}h-[${newHeight}${newUnit}]` : "";

		const predefinedClasses = [
			"h-0",
			"h-px",
			"h-0.5",
			"h-1",
			"h-1.5",
			"h-2",
			"h-2.5",
			"h-3",
			"h-3.5",
			"h-4",
			"h-5",
			"h-6",
			"h-7",
			"h-8",
			"h-9",
			"h-10",
			"h-11",
			"h-12",
			"h-14",
			"h-16",
			"h-20",
			"h-24",
			"h-28",
			"h-32",
			"h-36",
			"h-40",
			"h-44",
			"h-48",
			"h-52",
			"h-56",
			"h-60",
			"h-64",
			"h-72",
			"h-80",
			"h-96",
			"h-auto",
			"h-1/2",
			"h-1/3",
			"h-2/3",
			"h-1/4",
			"h-2/4",
			"h-3/4",
			"h-1/5",
			"h-2/5",
			"h-3/5",
			"h-4/5",
			"h-1/6",
			"h-2/6",
			"h-3/6",
			"h-4/6",
			"h-5/6",
			"h-full",
			"h-screen",
			"h-svh",
			"h-lvh",
			"h-dvh",
			"h-min",
			"h-max",
			"h-fit",
		];

		const updatedVal = val
			.split(" ")
			.filter(
				(cls) =>
					!(
						cls.startsWith(`${prefix}h-[`) ||
						(!prefix && cls.startsWith("h-[")) ||
						predefinedClasses.includes(cls)
					)
			)
			.concat(newClass)
			.filter(Boolean)
			.join(" ");

		update(updatedVal.trim());
	};

	return (
		<div className="flex items-center justify-between mb-1 text-xs text-primary-800">
			<label htmlFor="height" className="label">
				Height
			</label>
			<div className="relative w-[70%] border border-primary-900 rounded-md flex items-center justify-end">
				<input
					type="text"
					name="height"
					id="classes-form-height"
					className="!bg-transparent !border-none text-primary-800 px-1 py-1 w-full !outline-none text-[11px] flex-1"
					value={height}
					placeholder="0"
					onChange={handleHeightChange}
				/>
				<label htmlFor="unit-height" className="current-unit pl-1">
					<select
						className="!bg-transparent !border-none !outline-none focus:outline-none text-primary-800"
						id="unit-height"
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

export default Height;
