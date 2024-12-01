import React from "react";
import { createRoot } from "react-dom/client";
import iconsListSolid from "../../components/icons/IconListSolid";
import iconsListOutline from "../../components/icons/IconListOutline";

// Creating the maps for solid and outline icons
const solidIconsMap = Object.fromEntries(
	iconsListSolid.map((item) => [item.name, item.icon]),
);
const outlineIconsMap = Object.fromEntries(
	iconsListOutline.map((item) => [item.name, item.icon]),
);

document.addEventListener("DOMContentLoaded", () => {
	// Select all the accordion containers
	const accordionContainers = document.querySelectorAll(
		".tailwind-blocks-accordion",
	);

	accordionContainers.forEach((accordionContainer) => {
		// Get the "data-multiple" attribute value (whether multiple items can be open at once)
		const allowMultiple = accordionContainer.dataset.multiple === "true";

		// Select all accordion items inside the container
		const accordionItems = accordionContainer.querySelectorAll(
			".tailwind-blocks-accordion-item",
		);

		accordionItems.forEach((accordionItem, index) => {
			const header = accordionItem.querySelector(
				".tailwind-blocks-accordion-header",
			);
			const content = accordionItem.querySelector(
				".tailwind-blocks-accordion-content",
			);
			const icon = accordionItem.querySelector(
				".tailwind-blocks-accordion-icon",
			);

			// Get the default open state for the individual item
			const defaultOpen =
				accordionItem.dataset.open === "true" ||
				accordionItem.dataset.open === "1";
			console.log("defaultOpen", defaultOpen);

			const openIcon = icon.dataset.openIcon; // "arrow-down-tray-icon"
			const closeIcon = icon.dataset.closeIcon; // "arrow-left-start-on-rectangle-icon"
			const openIconType = icon.dataset.openIconType; // "solid"
			const closeIconType = icon.dataset.closeIconType; // "solid"

			// Set the initial icon (open icon by default) by rendering React component
			renderIcon(icon, openIcon, openIconType);

			// If defaultOpen is true, open the first accordion item
			if (defaultOpen) {
				accordionItem.classList.add("open");
				content.style.height = content.scrollHeight + "px"; // Set the content height when open
				renderIcon(icon, closeIcon, closeIconType); // Set the icon to the close icon when open
			}

			// Handle click event on accordion header
			header.addEventListener("click", () => {
				const isOpen = accordionItem.classList.contains("open");

				// If multiple items are allowed to be open, just toggle this one
				if (allowMultiple) {
					toggleAccordionItem(
						accordionItem,
						isOpen,
						content,
						icon,
						openIcon,
						closeIcon,
						openIconType,
						closeIconType,
					);
				} else {
					// If only one item can be open at a time, close all items and open the clicked one
					accordionItems.forEach((item) => {
						const itemContent = item.querySelector(
							".tailwind-blocks-accordion-content",
						);
						const itemIcon = item.querySelector(
							".tailwind-blocks-accordion-icon",
						);
						const itemIsOpen = item.classList.contains("open");
						if (item !== accordionItem) {
							item.classList.remove("open");
							itemContent.style.height = 0;
							renderIcon(
								itemIcon,
								itemIcon.dataset.openIcon,
								itemIcon.dataset.openIconType,
							); // Reset the icon to the open icon for closed items
						}
						// Open the clicked item
						if (!itemIsOpen) {
							toggleAccordionItem(
								accordionItem,
								false,
								content,
								icon,
								openIcon,
								closeIcon,
								openIconType,
								closeIconType,
							);
						}
					});
				}
			});
		});
	});

	// Function to render the icon using ReactDOM
	function renderIcon(iconElement, iconName, iconType) {
		const iconMap = iconType === "solid" ? solidIconsMap : outlineIconsMap;
		const IconComponent = iconMap[iconName];

		// Only render if we have the icon component
		if (IconComponent) {
			const root = createRoot(iconElement);
			root.render(<IconComponent />);
		}
	}

	// Function to toggle the accordion item
	function toggleAccordionItem(
		accordionItem,
		isOpen,
		content,
		icon,
		openIcon,
		closeIcon,
		openIconType,
		closeIconType,
	) {
		const iconMap = openIconType === "solid" ? solidIconsMap : outlineIconsMap;
		const OpenIcon = iconMap[openIcon] || openIcon; // Get the open icon React component or fallback
		const CloseIcon = iconMap[closeIcon] || closeIcon; // Get the close icon React component or fallback

		if (isOpen) {
			accordionItem.classList.remove("open");
			content.style.height = 0;
			renderIcon(icon, openIcon, openIconType); // Render open icon when closing
		} else {
			accordionItem.classList.add("open");
			content.style.height = content.scrollHeight + "px";
			renderIcon(icon, closeIcon, closeIconType); // Render close icon when opening
		}
	}
});
