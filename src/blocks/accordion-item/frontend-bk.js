import React from "react";
import { createRoot } from "react-dom/client";
import iconsListSolid from "../../components/icons/IconListSolid";
import iconsListOutline from "../../components/icons/IconListOutline";

// Function to replace <span> with the corresponding JSX component
function replaceSpansWithIcons() {
	const spans = document.querySelectorAll("span[data-icon]"); // Select all <span> elements with data-icon attribute

	// Convert the icon lists into quick lookup maps
	const solidIconsMap = Object.fromEntries(
		iconsListSolid.map((item) => [item.name, item.icon]),
	);
	const outlineIconsMap = Object.fromEntries(
		iconsListOutline.map((item) => [item.name, item.icon]),
	);

	spans.forEach((span) => {
		const iconName = span.getAttribute("data-icon"); // Get the icon name
		const iconType = span.getAttribute("data-icon-type"); // Get the icon type (solid/outline)
		const classNames = span.className; // Get existing classes

		// Select the correct icon map based on type
		const iconMap = iconType === "solid" ? solidIconsMap : outlineIconsMap;
		const IconComponent = iconMap[iconName]; // Get the corresponding icon component

		if (IconComponent) {
			// Create a container for React to render the icon
			const container = document.createElement("div");
			container.className = classNames; // Apply existing classes to the container

			// Replace the span with the container
			span.replaceWith(container);

			// Use createRoot to render the React component into the container
			const root = createRoot(container);
			root.render(<IconComponent className={classNames} />);
		} else {
			console.warn(`Icon "${iconName}" not found in ${iconType} icons.`);
		}
	});
}

// Call the function to perform the replacement
replaceSpansWithIcons();
