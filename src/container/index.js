import "../style.css";

import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import { useEffect, useState } from "@wordpress/element";
// import TailwindInput from "../../components/TailwindInput";
import Style from "../components/Style";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import { Input } from "aspect-ui/Input";
import {
	Dropdown,
	DropdownAction,
	DropdownContent,
	DropdownList,
} from "aspect-ui/Dropdown";

registerBlockType(metadata.name, { edit: EditComponent, save: SaveComponent });

function EditComponent(props) {
	var attributes = props.attributes;
	var setAttributes = props.setAttributes;
	var container = attributes.container;
	const [containerClass, setContainerClass] = useState(container.class);
	const CustomTag = container.tag;
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
		setContainerClass(container.class);
	}, [container.class]);
	function updateSkyColor(e) {
		props.setAttributes({ skyColor: e.target.value });
	}
	// function updateClass(e) {
	// 	props.setAttributes({ class: e.target.value });
	// }
	function updateTailwindClass(e) {
		setAttributes({ container: { ...container, class: e } });
	}
	function updateContainerId(e) {
		setAttributes({ container: { ...container, id: e.target.value } });
	}

	function updateGrassColor(e) {
		props.setAttributes({ grassColor: e.target.value });
	}

	const blockProps = useBlockProps({
		className: `${containerClass}`,
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		directInsert: true,
		templateInsertUpdatesSelection: true,
		renderAppender: InnerBlocks.ButtonBlockAppender,
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
								// className="mr-3 p-2 rounded-lg"
								type="text"
								value={container.id}
								onChange={updateContainerId}
								placeholder="sky color..."
							/>
							<Dropdown>
								<DropdownAction>
									{container.tag.length > 0
										? tagNameOptions.find(
												(option) => option.value === container.tag,
										  )?.label
										: "Select Tag Name"}
								</DropdownAction>
								<DropdownContent>
									{tagNameOptions.map((option, index) => {
										return (
											<DropdownList
												key={index}
												onClick={() => {
													setAttributes({
														container: { ...container, tag: option.value },
													});
												}}
											>
												{option.label}
											</DropdownList>
										);
									})}
								</DropdownContent>
							</Dropdown>
							<input
								className="mr-3 p-2 rounded-lg"
								type="container"
								value={attributes.grassColor}
								onChange={updateGrassColor}
								placeholder="grass color..."
							/>
						</TabContent>
						<TabContent value="item-2">
							<Style update={updateTailwindClass} val={container.class} />
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
