import "../../style.css";

import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from "aspect-ui/Accordion";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import DropdownData from "../../components/block-components/dropdown-data";
import LinkPicker from "../../components/block-components/link-picker";
import Style from "../../components/Style";
import { cn } from "../../components/utils/cn";
import metadata from "./block.json";

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
	{ label: "a", value: "a" },
];

registerBlockType(metadata.name, { edit: EditComponent });

function EditComponent({ attributes, setAttributes }) {
	const { title } = attributes;
	const CustomTag = title.tag || "div";

	// Helper to update text attributes
	const updateTitleAttribute = (key, value) => {
		setAttributes({ title: { ...title, [key]: value } });
	};

	// Block properties with dynamic classes
	const blockProps = useBlockProps({
		className: cn(
			"tailwind-blocks tailwind-blocks-text",
			title.class?.sm,
			title.class?.md,
			title.class?.desktop,
			title.class?.custom,
		),
	});

	const linkToOptions = [
		{ label: "Choose", value: "" },
		{ label: "Post URL", value: "postUrl" },
		{ label: "Home URL", value: "homeUrl" },
		{ label: "Custom Field", value: "customField" },
		{ label: "Custom URL", value: "customUrl" },
	];

	return (
		<>
			<InspectorControls>
				<div className="tailwind-blocks-editor-settings mb-3">
					<Accordion iconPosition="right">
						<AccordionItem
							id="image-wrapper"
							className=" border-primary-200 dark:border-primary-200"
						>
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b"
							>
								Image Wrapper
							</AccordionHeader>
							<AccordionContent className="py-3 px-3 border-0 pb-3 bg-transparent dark:bg-transparent">
								<Tabs defaultActive="item-1">
									<TabList className="px-3">
										<TabItem value="item-1">Options</TabItem>
										<TabItem value="item-2">Style</TabItem>
									</TabList>
									<TabContent
										value="item-1"
										className="space-y-3 py-3 px-3"
									></TabContent>
									<TabContent value="item-2">
										<Style
											update={(e) => updateTitleAttribute("wrapperClass", e)}
											val={title.class}
										/>
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							id="link"
							className=" border-primary-200 dark:border-primary-200"
						>
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b"
							>
								Image
							</AccordionHeader>
							<AccordionContent className="py-3 border-0 px-3 bg-transparent dark:bg-transparent">
								<Tabs defaultActive="item-1">
									<TabList className="px-3">
										<TabItem value="item-1">Options</TabItem>
										<TabItem value="item-2">Style</TabItem>
									</TabList>
									<TabContent value="item-1" className="space-y-3 py-3 px-3">
										
										<LinkPicker
											customUrlValue={title.customUrl}
											linkPickerOptions={linkToOptions}
											linkTargetValue={title.linkTarget}
											linkToValue={title.linkTo}
											customMetaKey={title.metaKey}
											updateLinkTo={(e) =>
												updateTitleAttribute("linkTo", e.target.value)
											}
											updateLinkTarget={(e) =>
												updateTitleAttribute("linkTarget", e.target.value)
											}
											updateCustomUrl={(e) =>
												updateTitleAttribute("customUrl", e.target.value)
											}
											updateCustomMetaKey={(e) =>
												updateTitleAttribute("metaKey", e.target.value)
											}
										/>
									</TabContent>
									<TabContent value="item-2">
										<Style
											update={(e) => updateTitleAttribute("linkClass", e)}
											val={title.linkClass}
										/>
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</InspectorControls>
			{/* {JSON.stringify(title)} */}
			<CustomTag {...blockProps}>
				{title.linkTo.length > 0 && (
					<a
						href="#"
						className={cn(
							title.linkClass?.sm,
							title.linkClass?.md,
							title.linkClass?.desktop,
							title.linkClass?.custom,
						)}
					>
						{title.content}
					</a>
				)}
				{title.linkTo.length == 0 && title.content}
			</CustomTag>
		</>
	);
}
