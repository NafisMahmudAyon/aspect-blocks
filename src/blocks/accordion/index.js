import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
// import TailwindInput from "../../components/TailwindInput";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import DropdownData from "../../components/block-components/dropdown-data";
import InputData from "../../components/block-components/input-data";
import SwitchData from "../../components/block-components/switch-data";
import Style from "../../components/Style";
import { cn } from "../../components/utils/cn";

registerBlockType(metadata.name, { edit: EditComponent, save: SaveComponent });

function EditComponent(props) {
	var attributes = props.attributes;
	var setAttributes = props.setAttributes;
	var accordion = attributes.accordion;
	const CustomTag = accordion.tag;
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

	function updateTailwindClass(e) {
		setAttributes({ accordion: { ...accordion, class: e } });
	}
	function updateAccordionId(e) {
		setAttributes({ accordion: { ...accordion, id: e.target.value } });
	}
	function handleMultipleChange(e) {
		setAttributes({ accordion: { ...accordion, multiple: e } });
	}
	function updateAccordionTag(e) {
		setAttributes({
			accordion: { ...accordion, tag: e.target.value },
		});
	}

	const blockProps = useBlockProps({
		className: cn(
			"tailwind-blocks tailwind-blocks-accordion-editor",
			accordion.class.sm,
			accordion.class.md,
			accordion.class.desktop,
			accordion.class.custom,
		),
	});
	const ALLOWED_BLOCKS = ["tailwind-blocks/accordion-item"];
	const MY_TEMPLATE = [
		["tailwind-blocks/accordion-item", {}],
		["tailwind-blocks/accordion-item", {}],
	];
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		directInsert: true,
		template: MY_TEMPLATE,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	});

	return (
		<>
			<InspectorControls>
				<div className="tailwind-blocks-editor-settings">
					<Tabs defaultActive="item-1">
						<TabList className="px-3">
							<TabItem value="item-1">Options</TabItem>
							<TabItem value="item-2">Style</TabItem>
						</TabList>
						<TabContent value="item-1" className="space-y-3 py-3 px-3">
							<InputData val={accordion.id} update={updateAccordionId} />
							<SwitchData
								label="Open Multiple"
								val={accordion.multiple}
								update={handleMultipleChange}
							/>
							<DropdownData
								label="Accordion Tag"
								options={tagNameOptions}
								value={accordion.tag}
								update={updateAccordionTag}
							/>
						</TabContent>
						<TabContent value="item-2">
							<Style update={updateTailwindClass} val={accordion.class} />
						</TabContent>
					</Tabs>
				</div>
			</InspectorControls>
			<CustomTag {...innerBlocksProps}>{innerBlocksProps.children}</CustomTag>
		</>
	);
}

function SaveComponent() {
	return <InnerBlocks.Content />;
}
