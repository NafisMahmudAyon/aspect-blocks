import apiFetch from "@wordpress/api-fetch";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { useEffect, useState } from "@wordpress/element";
import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import dummyImage from "../../../assets/placeholder.jpg";
import InputData from "../../components/block-components/input-data";
import SwitchData from "../../components/block-components/switch-data";
import Style from "../../components/Style";
import { cn } from "../../components/utils/cn";
import metadata from "./block.json";

registerBlockType(metadata.name, { edit: EditComponent });

function EditComponent({ attributes, setAttributes, context }) {
	const { image } = attributes;
	3;
	var postId = context["postId"];
	var postType = context["postType"];

	const [currentImg, setCurrentImg] = useState(dummyImage);
	const [selectedCaption, setSelectedCaption] = useState("");

	useEffect(() => {
		if (image.imgSrc === "media" && image.imgSrcUrl) {
			// Check if imgSrcUrl is valid
			setCurrentImg(image.imgSrcUrl);
		} else if (image.imgSrc === "customUrl" && image.customImgSrcUrl) {
			// Check if customImgSrcUrl is valid
			setCurrentImg(image.customImgSrcUrl);
		} else if (image.imgSrc === "customField" && image.metaKey) {
			fetchMetaValue().then((metaValue) => {
				// if (metaValue && isValidImageUrl(metaValue.meta_value)) {
				if (metaValue) {
					setCurrentImg(metaValue.meta_value);
				} else {
					setCurrentImg(dummyImage);
				}
			});
		} else {
			// Fallback to the dummy image
			setCurrentImg(dummyImage);
		}
	}, [image.imgSrc, image.imgSrcUrl, image.customImgSrcUrl, image.metaKey]); // Dependency array corrected
	useEffect(() => {
		if (image.captionEnable) {
			if (image.captionSrc === "customText") {
				// Check if imgSrcUrl is valid
				setSelectedCaption(image.customCaption);
			} else if (image.captionSrc === "customField" && image.captionMetaKey) {
				fetchMetaValue().then((metaValue) => {
					if (metaValue) {
						setSelectedCaption(metaValue.meta_value);
					} else {
						setSelectedCaption("");
					}
				});
			} else {
				setSelectedCaption("");
			}
		}
	}, [image.captionEnable, image.captionSrc, image.captionMetaKey]); // Dependency array corrected

	// console.log(currentImg, image.imgSrc, image.customImgSrcUrl, image.imgSrcUrl);
	const updateImageAttribute = (key, value) => {
		setAttributes({ image: { ...image, [key]: value } });
	};

	const fetchMetaValue = async () => {
		if (!postId || !image.metaKey) {
			// Post ID and Meta Key are required.
			return;
		}
		try {
			const response = await apiFetch({
				path: `/aspect-blocks/v2/meta?post_id=${postId}&meta_key=${image.metaKey}`,
			});
			// if (!response.ok) throw new Error("Meta value not found");
			return response;
		} catch (err) {
			console.error("Error fetching meta value:", err);
			setCurrentImg(dummyImage); // Fallback in case of an error
		}
	};

	const isValidImageUrl = (url) => {
		const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
		try {
			const urlObj = new URL(url);
			const extension = urlObj.pathname.split(".").pop();
			return imageExtensions.includes(extension.toLowerCase());
		} catch {
			return false; // If URL is invalid
		}
	};

	// Block properties with dynamic classes
	const blockProps = useBlockProps({
		className: cn(
			"aspect-blocks aspect-blocks-text",
			image.wrapperClass?.sm,
			image.wrapperClass?.md,
			image.wrapperClass?.desktop,
			image.wrapperClass?.custom,
		),
	});

	const imageSrc = [
		{ label: "Choose", value: "" },
		{ label: "Media", value: "media" },
		{ label: "Custom Field", value: "customField" },
		{ label: "Custom URL", value: "customUrl" },
	];
	const captionSrc = [
		{ label: "Choose", value: "" },
		{ label: "Custom Field", value: "customField" },
		{ label: "Custom Text", value: "customText" },
	];

	const ALLOWED_MEDIA_TYPES = ["image"];

	return (
		<>
			<InspectorControls>
				<div className="aspect-blocks-editor-settings mb-3">
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
							id="image"
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
										<div className="flex items-center justify-between text-[11px]">
											<label htmlFor="link-to">Image Source</label>
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
										<div className="px-2 py-2 border border-primary-200 cursor-pointer rounded-md">
											<MediaUploadCheck>
												<MediaUpload
													onSelect={(media) => {
														setAttributes({
															image: {
																...image,
																imgSrcUrl: media.url,
																imgSrcID: media.id,
															},
														});
													}}
													onClose={() => {}}
													allowedTypes={ALLOWED_MEDIA_TYPES}
													value={image.imgSrcID}
													render={({ open }) => {
														return (
															<img
																src={currentImg}
																alt=""
																className="cursor-pointer rounded-md"
																onClick={() => {
																	if (image.imgSrc === "media") {
																		open();
																	}
																}}
															/>
														);
													}}
												></MediaUpload>
											</MediaUploadCheck>
										</div>
										{image.imgSrc === "customField" && (
											<InputData
												label="Meta Key"
												placeholder="Enter a meta key"
												val={image.metaKey}
												update={(e) =>
													updateImageAttribute("metaKey", e.target.value)
												}
											/>
										)}
										{image.imgSrc === "customUrl" && (
											<InputData
												label="Custom Url"
												placeholder="Enter a url"
												val={image.customImgSrcUrl}
												update={(e) =>
													updateImageAttribute(
														"customImgSrcUrl",
														e.target.value,
													)
												}
											/>
										)}
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
						<AccordionItem
							id="image-caption"
							className=" border-primary-200 dark:border-primary-200"
						>
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b"
							>
								Image Caption
							</AccordionHeader>
							<AccordionContent className="py-3 border-0 px-3 bg-transparent dark:bg-transparent">
								<Tabs defaultActive="item-1">
									<TabList className="px-3">
										<TabItem value="item-1">Options</TabItem>
										<TabItem value="item-2">Style</TabItem>
									</TabList>
									<TabContent value="item-1" className="space-y-3 py-3 px-3">
										<SwitchData
											label="Caption Enable"
											val={image.captionEnable}
											update={(e) => updateImageAttribute("captionEnable", e)}
										/>
										{image.captionEnable && (
											<>
												<div className="flex items-center justify-between text-[11px]">
													<label
														htmlFor="link-to"
														className="mb-0 font-medium text-[11px] text-primary-900"
													>
														Caption Source
													</label>
													<select
														onChange={(e) =>
															updateImageAttribute("captionSrc", e.target.value)
														}
														value={image.captionSrc}
														className="!text-[11px] !text-primary-900 hover:!text-primary-900 !border !border-gray-300"
													>
														{captionSrc.map((option, index) => (
															<option
																key={index}
																value={option.value}
																className=""
															>
																{option.label}
															</option>
														))}
													</select>
												</div>
												{image.captionSrc === "customField" && (
													<InputData
														label="Meta Key"
														placeholder="Enter a meta key"
														val={image.captionMetaKey}
														update={(e) =>
															updateImageAttribute(
																"captionMetaKey",
																e.target.value,
															)
														}
													/>
												)}
												{image.captionSrc === "customText" && (
													<InputData
														label="Custom caption"
														placeholder="Enter a caption"
														val={image.customCaption}
														update={(e) =>
															updateImageAttribute(
																"customCaption",
																e.target.value,
															)
														}
													/>
												)}
											</>
										)}
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
											update={(e) => updateImageAttribute("captionClass", e)}
											val={image.captionClass}
										/>
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</InspectorControls>
			{/* {JSON.stringify(image)} */}
			<figure {...blockProps}>
				<img
					src={currentImg}
					alt=""
					className={cn(
						image.class?.sm,
						image.class?.md,
						image.class?.desktop,
						image.class?.custom,
					)}
				/>
				{image.captionEnable && (
					<figcaption
						className={cn(
							image.captionClass?.sm,
							image.captionClass?.md,
							image.captionClass?.desktop,
							image.captionClass?.custom,
						)}
					>
						{selectedCaption}
					</figcaption>
				)}
			</figure>
		</>
	);
}
