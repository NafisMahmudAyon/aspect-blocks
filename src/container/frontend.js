import React from "react";
import ReactDOM from "react-dom/client";

const divsToUpdate = document.querySelectorAll(".wp-tailwind-container");

divsToUpdate.forEach((div) => {
	try {
		const rawText = div.querySelector("pre").innerText;
		// console.log(rawText);
		const data = JSON.parse(rawText);
		console.log(data);
		const root = ReactDOM.createRoot(div);
		root.render(<OurComponent {...data} />);
		div.classList.remove("wp-tailwind-container");
	} catch (error) {
		console.error("Failed to parse JSON:", error);
	}
});


function OurComponent({ attributes, content, block }) {
  // console.log(attributes, content, block);
  console.log(content);

  // Assuming attributes contain a container object with a class property
	var container = attributes.container;
	const containerClass = container.class;

  const CustomTag = "div";

  return <CustomTag className={containerClass}>
		{/* {content} */}
		</CustomTag>;
}