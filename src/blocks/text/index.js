import "../../style.css";

import {
	InspectorControls,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { useEffect, useState } from "@wordpress/element";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import DropdownData from "../../components/block-components/dropdown-data";
import InputData from "../../components/block-components/input-data";
import { cn } from "../../components/utils/cn";
import metadata from "./block.json";

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
	function updateTextTag(e) {
		setAttributes({ text: { ...text, tag: e.target.value } });
	}

	const blockProps = useBlockProps({
		className: cn(
			"tailwind-blocks tailwind-blocks-text",
			attributes.text.class?.sm,
			attributes.text.class?.md,
			attributes.text.class?.desktop,
			attributes.text.class?.custom,
		),
	});

	const StyleX = window.tailwindBlocks.Style;

	return (
		<>
			<InspectorControls>
				<div className="">
					<Tabs defaultActive="item-1">
						<TabList className="px-3">
							<TabItem value="item-1">Options</TabItem>
							<TabItem value="item-2">Style</TabItem>
						</TabList>
						<TabContent value="item-1" className="space-y-3 py-3 px-3">
							<InputData val={text.id} update={updateTextId} />
							<DropdownData
								label="Accordion Item Tag"
								options={tagNameOptions}
								value={text.tag}
								update={updateTextTag}
							/>
						</TabContent>
						<TabContent value="item-2">
							<StyleX update={updateTailwindClass} val={text.class} />
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
