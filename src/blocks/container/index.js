import "../../style.css";
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import { useEffect } from "@wordpress/element";
import Style from "../../components/Style";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import { Input } from "aspect-ui/Input";
import {
	Dropdown,
	DropdownAction,
	DropdownContent,
	DropdownList,
} from "aspect-ui/Dropdown";
import { cn } from "../../components/utils/cn";
import DropdownData from "../../components/block-components/dropdown-data";
import InputData from "../../components/block-components/input-data";

// Constants
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

// Block Registration
registerBlockType(metadata.name, { edit: EditComponent, save: SaveComponent });

function EditComponent({ attributes, setAttributes }) {
	const { container } = attributes;
	const { id, tag, class: containerClass } = container;

	useEffect(() => {
		// Ensure state stays in sync
		if (!containerClass) {
			setAttributes({
				container: {
					...container,
					class: { sm: "", md: "", desktop: "", custom: "" },
				},
			});
		}
	}, [containerClass, setAttributes]);

	const CustomTag = container.tag || "div";

	// Handlers
	const updateTailwindClass = (classes) => {
		setAttributes({ container: { ...container, class: classes } });
	};

	const updateContainerId = (e) => {
		setAttributes({ container: { ...container, id: e.target.value } });
	};

	const updateContainerTag = (e) => {
		setAttributes({ container: { ...container, tag: e.target.value } });
	};

	// Props
	const blockProps = useBlockProps({
		className: cn(
			"aspect-blocks",
			containerClass?.sm,
			containerClass?.md,
			containerClass?.desktop,
			containerClass?.custom,
		),
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		directInsert: true,
		templateInsertUpdatesSelection: true,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	});

	// Render
	return (
		<>
			<InspectorControls>
				<div className=" p-3">
					<Tabs defaultActive="item-1">
						<TabList>
							<TabItem value="item-1">Options</TabItem>
							<TabItem value="item-2">Style</TabItem>
						</TabList>
						<TabContent value="item-1" className="space-y-3">
							<InputData val={id || ""} update={updateContainerId} />
							<DropdownData
								label="Tag"
								options={tagNameOptions}
								value={container.tag}
								update={updateContainerTag}
							/>
							{/* <Dropdown>
								<DropdownAction aria-label="Select tag name">
									{tag
										? tagNameOptions.find((option) => option.value === tag)
												?.label
										: "Select Tag Name"}
								</DropdownAction>
								<DropdownContent>
									{tagNameOptions.map((option) => (
										<DropdownList
											key={option.value}
											onClick={() => updateContainerTag(option.value)}
										>
											{option.label}
										</DropdownList>
									))}
								</DropdownContent>
							</Dropdown> */}
						</TabContent>
						<TabContent value="item-2">
							<Style update={updateTailwindClass} val={containerClass} />
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
