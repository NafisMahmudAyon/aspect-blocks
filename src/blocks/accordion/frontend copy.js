function initializeAccordions() {
	document
		.querySelectorAll(".tailwind-blocks-accordion")
		.forEach((accordion) => {
			const allowMultiple =
				accordion.dataset.multiple === "true" ||
				accordion.dataset.multiple === "1";

			accordion
				.querySelectorAll(".tailwind-blocks-accordion-item")
				.forEach((item) => {
					const header = item.querySelector(
						".tailwind-blocks-accordion-header",
					);
					const content = item.querySelector(
						".tailwind-blocks-accordion-content",
					);
					const icon = item.querySelector(".tailwind-blocks-accordion-icon");

					// Check initial state (data-open)
					const isOpen = item.dataset.open === "true" || item.dataset.open === "1";

					// Ensure content starts closed
					if (!isOpen) {
						content.style.height = "0";
						content.classList.remove("open");
						icon.classList.remove("rotate");
					} else {
						content.style.height = `${content.scrollHeight}px`;
						content.classList.add("open");
						icon.classList.add("rotate");
					}

					// Handle click events
					header.addEventListener("click", () => {
						const isCurrentlyOpen = content.classList.contains("open");

						if (isCurrentlyOpen) {
							// Close this item
							closeItem(content, icon);
						} else {
							// Close other items if allowMultiple is false
							if (!allowMultiple) {
								accordion
									.querySelectorAll(".tailwind-blocks-accordion-content.open")
									.forEach((openContent) => {
										const openIcon = openContent
											.closest(".tailwind-blocks-accordion-item")
											.querySelector(".tailwind-blocks-accordion-icon");
										closeItem(openContent, openIcon);
									});
							}

							// Open the clicked item
							openItem(content, icon);
						}
					});
				});
		});
}

function openItem(content, icon) {
	content.style.height = `${content.scrollHeight}px`;
	content.classList.add("open");
	icon.classList.add("rotate");
}

function closeItem(content, icon) {
	content.style.height = "0";
	content.classList.remove("open");
	icon.classList.remove("rotate");
}

// Initialize accordions
document.addEventListener("DOMContentLoaded", initializeAccordions);
