import InputData from "./input-data";

const LinkPicker = ({
	linkToValue,
	linkTargetValue,
	customUrlValue,
	customMetaKey,
	linkPickerOptions,
	updateLinkTo,
	updateLinkTarget,
	updateCustomUrl,
	updateCustomMetaKey,
}) => {
	return (
		<div className="space-y-3 !text-[11px]">
			<div className="flex items-center justify-between">
				<label htmlFor="link-to">Link To</label>
				<select
					onChange={updateLinkTo}
					value={linkToValue}
					className="!text-[11px] !text-primary-900 hover:!text-primary-900 !border !border-gray-300"
				>
					{linkPickerOptions.map((option, index) => (
						<option key={index} value={option.value} className="">
							{option.label}
						</option>
					))}
				</select>
			</div>
			{linkToValue.length > 0 && (
				<>
					<div className="flex items-center justify-between">
						<label htmlFor="link-target">Link Target</label>
						<select
							onChange={updateLinkTarget}
							value={linkTargetValue}
							className="!text-[11px] !text-primary-900 hover:!text-primary-900 !border !border-gray-300"
						>
							<option value="_self">_self</option>
							<option value="_blank">_blank</option>
							<option value="_parent">_parent</option>
							<option value="_top">_top</option>
						</select>
					</div>
					{linkToValue === "customUrl" && (
						<>
							<InputData
								label="Custom URL"
								placeholder="Enter a URL"
								val={customUrlValue}
								update={updateCustomUrl}
							/>
						</>
					)}
					{linkToValue === "customField" && (
						<>
							<InputData
								label="Meta Key"
								placeholder="Enter a meta key"
								val={customMetaKey}
								update={updateCustomMetaKey}
							/>
						</>
					)}
				</>
			)}
		</div>
	);
};
export default LinkPicker