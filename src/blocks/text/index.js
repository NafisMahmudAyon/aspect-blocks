import "../../style.css";

import {
	InspectorControls,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import DropdownData from "../../components/block-components/dropdown-data";
import InputData from "../../components/block-components/input-data";
import { cn } from "../../components/utils/cn";
import metadata from "./block.json";
import Style from "../../components/Style";

const tagNameOptions = [
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

registerBlockType(metadata.name, { edit: EditComponent });

function EditComponent({ attributes, setAttributes }) {
	const { text } = attributes;
	const CustomTag = text.tag || "div";

	// Helper to update text attributes
	const updateTextAttribute = (key, value) => {
		setAttributes({ text: { ...text, [key]: value } });
	};

	// Block properties with dynamic classes
	const blockProps = useBlockProps({
		className: cn(
			"aspect-blocks aspect-blocks-text",
			text.class?.sm,
			text.class?.md,
			text.class?.desktop,
			text.class?.custom,
		),
	});

	return (
		<>
			<InspectorControls>
				<div className="aspect-blocks-editor-settings">
					<Tabs defaultActive="item-1">
						<TabList className="px-3">
							<TabItem value="item-1">Options</TabItem>
							<TabItem value="item-2">Style</TabItem>
						</TabList>
						<TabContent value="item-1" className="space-y-3 py-3 px-3">
							<InputData
								val={text.id}
								update={(e) => updateTextAttribute("id", e.target.value)}
							/>
							<DropdownData
								label="Tag"
								options={tagNameOptions}
								value={text.tag}
								update={(e) => updateTextAttribute("tag", e.target.value)}
							/>
						</TabContent>
						<TabContent value="item-2">
							<Style
								update={(e) => updateTextAttribute("class", e)}
								val={text.class}
							/>
						</TabContent>
					</Tabs>
				</div>
			</InspectorControls>

			<RichText
				{...blockProps}
				tagName={CustomTag}
				value={text.content}
				allowedFormats={["core/bold", "core/italic", "core/link"]}
				onChange={(value) => updateTextAttribute("content", value)}
				placeholder="Start Writing..."
			/>
		</>
	);
}
