import "../style.css";

import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import { useEffect, useState } from "@wordpress/element";
import Style from "../components/Style";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import { Input } from "aspect-ui/Input";
import { Dropdown, DropdownAction, DropdownContent, DropdownList } from "aspect-ui/Dropdown";

registerBlockType(metadata.name, { edit: EditComponent });

function EditComponent(props) {
	var attributes = props.attributes;
	var setAttributes = props.setAttributes;
	var text = attributes.text;
	const [textClass, setTextClass] = useState(text.class);
	const CustomTag = text.tag;
	const tagNameOptions = [
		// { label: "a", value: "a" },
		{ label: "H1", value: "h1" },
		{ label: "H2", value: "h2" },
		{ label: "H3", value: "h3" },
		{ label: "H4", value: "h4" },
		{ label: "H5", value: "h5" },
		{ label: "H6", value: "h6" },
		{ label: "SPAN", value: "span" },
		{ label: "DIV", value: "div" },
		{ label: "P", value: "p" },
	];
	useEffect(() => {
		setTextClass(text.class);
	}, [text.class]);
	function updateTailwindClass(e) {
		setAttributes({ text: { ...text, class: e } });
	}
	function updateTextId(e) {
		setAttributes({ text: { ...text, id: e.target.value } });
	}

	const blockProps = useBlockProps({
		className: `${textClass} `,
	});

	return (
		<>
			<InspectorControls>
				<div className="bg-primary-200">
					<Tabs defaultActive="item-1">
						<TabList>
							<TabItem value="item-1">Options</TabItem>
							<TabItem value="item-2">Style</TabItem>
						</TabList>
						<TabContent value="item-1">
							<Input
								label="ID"
								type="text"
								value={text.id}
								onChange={updateTextId}
								placeholder="sky color..."
							/>
							<Dropdown>
								<DropdownAction>
									{text.tag.length > 0
										? tagNameOptions.find((option) => option.value === text.tag)
												?.label
										: "Select Tag Name"}
								</DropdownAction>
								<DropdownContent>
									{tagNameOptions.map((option, index) => {
										return (
											<DropdownList
												key={index}
												onClick={() => {
													setAttributes({
														text: { ...text, tag: option.value },
													});
												}}
											>
												{option.label}
											</DropdownList>
										);
									})}
								</DropdownContent>
							</Dropdown>
						</TabContent>
						<TabContent value="item-2">
							<Style update={updateTailwindClass} val={text.class} />
						</TabContent>
					</Tabs>
				</div>
			</InspectorControls>
			<RichText
				{...blockProps}
				tagName={CustomTag}
				value={text.content}
				allowedFormats={["core/bold", "core/italic", "core/link"]}
				onChange={(value) => {
					setAttributes({ text: { ...text, content: value } });
				}}
				placeholder={"Start Writing..."}
			/>
		</>
	);
}
