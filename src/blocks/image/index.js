import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
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
	const { image } = attributes;
	console.log(image)
	// const CustomTag = image.tag || "div";

	// Helper to update text attributes
	const updateImageAttribute = (key, value) => {
		setAttributes({ image: { ...image, [key]: value } });
	};

	// Block properties with dynamic classes
	const blockProps = useBlockProps({
		className: cn(
			"tailwind-blocks tailwind-blocks-text",
			image.class?.sm,
			image.class?.md,
			image.class?.desktop,
			image.class?.custom,
		),
	});

	const imageSrc = [
		{ label: "Choose", value: "" },
		{ label: "Media", value: "media" },
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
											update={(e) => updateImageAttribute("wrapperClass", e)}
											val={image.wrapperClass}
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
										<div className="flex items-center justify-between">
											<label htmlFor="link-to">Image Src</label>
											<select
												onChange={(e) =>
													updateImageAttribute("imgSrc", e.target.value)
												}
												value={image.imgSrc}
												className="!text-[11px] !text-primary-900 hover:!text-primary-900 !border !border-gray-300"
											>
												{imageSrc.map((option, index) => (
													<option key={index} value={option.value} className="">
														{option.label}
													</option>
												))}
											</select>
										</div>
										{/* <LinkPicker
											customUrlValue={image.customUrl}
											linkPickerOptions={linkToOptions}
											linkTargetValue={image.linkTarget}
											linkToValue={image.linkTo}
											customMetaKey={image.metaKey}
											updateLinkTo={(e) =>
												updateImageAttribute("linkTo", e.target.value)
											}
											updateLinkTarget={(e) =>
												updateImageAttribute("linkTarget", e.target.value)
											}
											updateCustomUrl={(e) =>
												updateImageAttribute("customUrl", e.target.value)
											}
											updateCustomMetaKey={(e) =>
												updateImageAttribute("metaKey", e.target.value)
											}
										/> */}
									</TabContent>
									<TabContent value="item-2">
										<Style
											update={(e) => updateImageAttribute("class", e)}
											val={image.class}
										/>
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</InspectorControls>
			{/* {JSON.stringify(title)} */}
			<figure {...blockProps}>
				{image.content}
			</figure>
		</>
	);
}
