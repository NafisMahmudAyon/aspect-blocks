function initializeAccordions() {
	document.querySelectorAll(".aspect-blocks-accordion").forEach((accordion) => {
		const allowMultiple =
			accordion.dataset.multiple === "true" ||
			accordion.dataset.multiple === "1";

		accordion
			.querySelectorAll(".aspect-blocks-accordion-item")
			.forEach((item) => {
				const header = item.querySelector(".aspect-blocks-accordion-header");
				const content = item.querySelector(".aspect-blocks-accordion-content");
				const icon = item.querySelector(".aspect-blocks-accordion-icon");

				// Check initial state (data-open)
				const isOpen =
					item.dataset.open === "true" || item.dataset.open === "1";

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
								.querySelectorAll(".aspect-blocks-accordion-content.open")
								.forEach((openContent) => {
									const openIcon = openContent
										.closest(".aspect-blocks-accordion-item")
										.querySelector(".aspect-blocks-accordion-icon");
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
