import React from "react";
// import {
// 	Dropdown,
// 	DropdownAction,
// 	DropdownContent,
// 	DropdownList,
// } from "aspect-ui/Dropdown";

const DropdownData = ({ label, options, value, update }) => {
	const selectedLabel =
		value.length > 0
			? options.find((option) => option.value === value)?.label
			: "Select Tag Name";

	return (
		<div className="w-full inline-flex gap-3 items-center justify-between">
			<span className="text-primary-900 font-medium text-[11px]">{label}</span>
			{/* <Dropdown>
				<DropdownAction>{selectedLabel}</DropdownAction>
				<DropdownContent className="z-50">
					{options.map((option, index) => (
						<DropdownList key={index} onClick={() => onChange(option.value)}>
							{option.label}
						</DropdownList>
					))}
				</DropdownContent>
			</Dropdown> */}
			<select
				onChange={update}
				value={value}
				className="!text-[11px] !text-primary-900 hover:!text-primary-900"
			>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default DropdownData;
