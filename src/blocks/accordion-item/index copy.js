import {
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
// import TailwindInput from "../../components/TailwindInput";
import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import { useState } from "react";
import DropdownData from "../../components/block-components/dropdown-data";
import InputData from "../../components/block-components/input-data";
import SwitchData from "../../components/block-components/switch-data";
import iconsListOutline from "../../components/icons/IconListOutline";
import iconsListSolid from "../../components/icons/IconListSolid";
import Icons from "../../components/icons/Icons";
import Style from "../../components/Style";
import { cn } from "../../components/utils/cn";

registerBlockType(metadata.name, { edit: EditComponent, save: SaveComponent });

function EditComponent(props) {
	var attributes = props.attributes;
	var setAttributes = props.setAttributes;
	var accordionItem = attributes.accordionItem;
	const CustomTag = accordionItem.tag;
	const CustomHeaderTag = accordionItem.headerTag;
	const CustomContentTag = accordionItem.contentTag;
	const [open, setOpen] = useState(true);
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
		setAttributes({ accordionItem: { ...accordionItem, class: e } });
	}
	function updateTailwindHeaderClass(e) {
		setAttributes({
			accordionItem: { ...accordionItem, accordionHeaderClass: e },
		});
	}
	function updateTailwindHeaderTitleClass(e) {
		setAttributes({
			accordionItem: { ...accordionItem, accordionHeaderTitleClass: e },
		});
	}
	function updateTailwindContentClass(e) {
		setAttributes({
			accordionItem: { ...accordionItem, accordionContentClass: e },
		});
	}
	function updateTailwindIconClass(e) {
		setAttributes({
			accordionItem: { ...accordionItem, accordionIconClass: e },
		});
	}
	function updateAccordionItemId(e) {
		setAttributes({ accordionItem: { ...accordionItem, id: e.target.value } });
	}
	function updateAccordionItemTag(e) {
		setAttributes({ accordionItem: { ...accordionItem, tag: e.target.value } });
	}
	function updateAccordionItemHeaderTag(e) {
		setAttributes({
			accordionItem: { ...accordionItem, headerTag: e.target.value },
		});
	}
	function updateAccordionItemContentTag(e) {
		setAttributes({
			accordionItem: { ...accordionItem, contentTag: e.target.value },
		});
	}
	function handleOpenChange(e) {
		setAttributes({ accordionItem: { ...accordionItem, open: e } });
	}
	function handleDisabledChange(e) {
		setAttributes({ accordionItem: { ...accordionItem, disabled: e } });
	}
	function handleOpenIconChange(e) {
		setAttributes({ accordionItem: { ...accordionItem, openIcon: e } });
	}
	function handleCloseIconChange(e) {
		setAttributes({ accordionItem: { ...accordionItem, closeIcon: e } });
	}

	// Creating the maps for solid and outline icons
	const solidIconsMap = Object.fromEntries(
		iconsListSolid.map((item) => [item.name, item.icon]),
	);
	const outlineIconsMap = Object.fromEntries(
		iconsListOutline.map((item) => [item.name, item.icon]),
	);

	function renderIcon(iconName, iconType) {
		const iconMap = iconType === "solid" ? solidIconsMap : outlineIconsMap;
		const IconComponent = iconMap[iconName];

		return <IconComponent />;
	}

	const blockProps = useBlockProps({
		className: cn(
			"tailwind-blocks tailwind-blocks-accordion-item",
			accordionItem.class.sm,
			accordionItem.class.md,
			accordionItem.class.desktop,
			accordionItem.class.custom,
		),
		...(accordionItem.disabled ? { disabled: true } : {}),
	});

	// const innerBlocksProps = useInnerBlocksProps(blockProps, {
	// 	directInsert: true,
	// 	templateInsertUpdatesSelection: true,
	// 	renderAppender: InnerBlocks.ButtonBlockAppender,
	// });

	return (
		<>
			<InspectorControls>
				<div className="tailwind-blocks-editor-settings">
					<Accordion iconPosition="right">
						<AccordionItem id="accordion-item">
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b "
							>
								Accordion Item
							</AccordionHeader>
							<AccordionContent className="py-3 px-3 border-0 border-b pb-3 bg-transparent dark:bg-transparent">
								<Tabs defaultActive="item-1">
									<TabList>
										<TabItem value="item-1">Options</TabItem>
										<TabItem value="item-2">Style</TabItem>
									</TabList>
									<TabContent value="item-1" className="space-y-3">
										<InputData
											val={accordionItem.id}
											update={updateAccordionItemId}
										/>
										{/* <Input
											label="ID"
											className="placeholder:text-primary-400"
											wrapperClassName="w-full inline-flex items-center gap-3 justify-between"
											icon={false}
											type="text"
											value={accordionItem.id}
											onChange={updateAccordionItemId}
											placeholder="id"
										/> */}
										<SwitchData
											label="Open Onload"
											val={accordionItem.open}
											update={handleOpenChange}
										/>
										<Icons
											label="Select Open Icon"
											val={accordionItem.openIcon}
											update={handleOpenIconChange}
										/>
										<Icons
											label="Select Close Icon"
											val={accordionItem.closeIcon}
											update={handleCloseIconChange}
										/>
										{/* <Switch
											className="w-full inline-flex flex-row-reverse gap-3 justify-between"
											labelClassName="text-primary-900 dark:text-primary-900 ml-0 font-medium"
											activeClassName="bg-primary-900 dark:bg-primary-900"
											deactiveClassName="bg-primary-200 dark:bg-primary-200"
											deactiveSwitchClassName="bg-primary-900 dark:bg-primary-900"
											activeSwitchClassName="bg-primary-200 dark:bg-primary-200"
											checked={accordionItem.open}
											onChange={handleOpenChange}
											label="Open Onload"
										/> */}
										<SwitchData
											label="Disabled"
											val={accordionItem.disabled}
											update={handleDisabledChange}
										/>
										{/* <Switch
											className="w-full inline-flex flex-row-reverse gap-3 justify-between"
											labelClassName="text-primary-900 dark:text-primary-900 ml-0 font-medium"
											activeClassName="bg-primary-900"
											deactiveClassName="bg-primary-200"
											activeSwitchClassName="bg-primary-900"
											deactiveSwitchClassName="bg-primary-200"
											checked={accordionItem.disabled}
											onChange={handleDisabledChange}
											label="Disabled"
										/> */}
										<DropdownData
											label="Accordion Item Tag"
											options={tagNameOptions}
											value={accordionItem.tag}
											update={updateAccordionItemTag}
										/>
										{/* <div className="w-full inline-flex gap-3 items-center justify-between">
											<span className="text-primary-900 font-medium">
												Accordion Item Tag
											</span>
											<Dropdown>
												<DropdownAction>
													{accordionItem.tag.length > 0
														? tagNameOptions.find(
																(option) => option.value === accordionItem.tag,
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
																		accordionItem: {
																			...accordionItem,
																			tag: option.value,
																		},
																	});
																}}
															>
																{option.label}
															</DropdownList>
														);
													})}
												</DropdownContent>
											</Dropdown>
										</div> */}
									</TabContent>
									<TabContent value="item-2">
										<Style
											update={updateTailwindClass}
											val={accordionItem.class}
										/>
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem id="accordion-item-header">
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b "
							>
								Accordion Item Header
							</AccordionHeader>
							<AccordionContent className="py-3 px-3 border-0 border-b pb-3 space-y-2 bg-transparent dark:bg-transparent">
								<Tabs defaultActive="item-1">
									<TabList>
										<TabItem value="item-1">Options</TabItem>
										<TabItem value="item-2">Style</TabItem>
									</TabList>
									<TabContent value="item-1">
										<DropdownData
											label="Header Tag"
											options={tagNameOptions}
											value={accordionItem.headerTag}
											update={updateAccordionItemHeaderTag}
										/>
									</TabContent>
									<TabContent value="item-2">
										<Style
											update={updateTailwindHeaderClass}
											val={accordionItem.accordionIconClass}
										/>
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem id="accordion-item-header-title">
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b "
							>
								Header Title
							</AccordionHeader>
							<AccordionContent className="py-3 px-3 border-0 border-b pb-3 space-y-2 bg-transparent dark:bg-transparent">
								<Tabs defaultActive="item-1">
									<TabList>
										<TabItem value="item-1">Options</TabItem>
										<TabItem value="item-2">Style</TabItem>
									</TabList>
									<TabContent value="item-1"></TabContent>
									<TabContent value="item-2">
										<Style
											update={updateTailwindHeaderTitleClass}
											val={accordionItem.accordionHeaderTitleClass}
										/>
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem id="accordion-item-content">
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b "
							>
								Accordion Item Content
							</AccordionHeader>
							<AccordionContent className="py-3 px-3 border-0 border-b pb-3 space-y-2 bg-transparent dark:bg-transparent">
								<Tabs defaultActive="item-1">
									<TabList>
										<TabItem value="item-1">Options</TabItem>
										<TabItem value="item-2">Style</TabItem>
									</TabList>
									<TabContent value="item-1">
										<DropdownData
											label="Content Tag"
											options={tagNameOptions}
											value={accordionItem.contentTag}
											update={updateAccordionItemContentTag}
										/>
									</TabContent>
									<TabContent value="item-2">
										<Style
											update={updateTailwindContentClass}
											val={accordionItem.accordionContentClass}
										/>
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem id="accordion-item-header-icon">
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b "
							>
								Header Icon
							</AccordionHeader>
							<AccordionContent className="py-3 px-3 border-0 border-b pb-3 space-y-2 bg-transparent dark:bg-transparent">
								<Tabs defaultActive="item-1">
									<TabList>
										<TabItem value="item-1">Options</TabItem>
										<TabItem value="item-2">Style</TabItem>
									</TabList>
									<TabContent value="item-1"></TabContent>
									<TabContent value="item-2">
										<Style
											update={updateTailwindIconClass}
											val={accordionItem.accordionHeaderTitleClass}
										/>
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</InspectorControls>
			{JSON.stringify(accordionItem)}
			<CustomTag {...blockProps}>
				<CustomHeaderTag
					onClick={() => {
						setOpen(!open);
					}}
					className={cn(
						"tailwind-blocks-accordion-header",
						accordionItem.accordionHeaderClass.sm,
						accordionItem.accordionHeaderClass.md,
						accordionItem.accordionHeaderClass.desktop,
						accordionItem.accordionHeaderClass.custom,
					)}
				>
					<RichText
						className={cn(
							"tailwind-blocks-accordion-header-title",
							accordionItem.accordionHeaderTitleClass.sm,
							accordionItem.accordionHeaderTitleClass.md,
							accordionItem.accordionHeaderTitleClass.desktop,
							accordionItem.accordionHeaderTitleClass.custom,
						)}
						tagName="span"
						value={accordionItem.headerTitle}
						allowedFormats={["core/bold", "core/italic", "core/link"]}
						onChange={(value) => {
							setAttributes({
								accordionItem: { ...accordionItem, headerTitle: value },
							});
						}}
						placeholder={"Start Writing..."}
					/>
					{/* <span>Accordion Item 1</span> */}
					<span className="tailwind-blocks-accordion-icon size-6">
						{open ? (
							<>
								{accordionItem.openIcon !== undefined
									? renderIcon(
											accordionItem.openIcon,
											accordionItem.openIconType,
									  )
									: renderIcon("chevron-down-icon", "solid")}
							</>
						) : (
							<>
								{accordionItem.closeIcon !== undefined
									? renderIcon(
											accordionItem.closeIcon,
											accordionItem.closeIconType,
									  )
									: renderIcon("chevron-down-icon", "solid")}
							</>
						)}
					</span>
				</CustomHeaderTag>
				<CustomContentTag
					className={cn(
						"tailwind-blocks-accordion-content-editor transition-[max-height] duration-300 ease-in-out",
						accordionItem.accordionContentClass.sm,
						accordionItem.accordionContentClass.md,
						accordionItem.accordionContentClass.desktop,
						accordionItem.accordionContentClass.custom,
					)}
					style={{
						display: open ? "block" : "none",
						maxHeight: open ? "auto" : "0",
						overflow: "hidden",
						transition: "max-height 0.3s ease-in-out",
					}}
				>
					<InnerBlocks
						renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
					/>
				</CustomContentTag>
			</CustomTag>
		</>
	);
}

function SaveComponent() {
	return <InnerBlocks.Content />;
}
