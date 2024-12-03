
import React, { useState } from "react"
import ReactDOM from "react-dom/client"

const divsToUpdate = document.querySelectorAll(".tailwind-update-me1")

divsToUpdate.forEach(div => {
  const data = JSON.parse(div.querySelector("pre").innerText)
  // console.log(data)
  const root = ReactDOM.createRoot(div)
  root.render(<OurComponent {...data} />)
  div.classList.remove("tailwind-update-me")
})

function OurComponent(props) {
  const [blockClass, setBlockClass] = useState(
		props.class ||
			"bg-amber-100 border-2 border-amber-300 p-4 my-3 rounded-sm shadow-md",
	);
  const [showSkyColor, setShowSkyColor] = useState(false)
  const [showGrassColor, setShowGrassColor] = useState(false)
  console.log(props)
  const handleClassUpdate = (newClass) => {
		setBlockClass(newClass); // Update the Tailwind class dynamically
	};

  return (
		<div className="my-unique-plugin-wrapper-class">
			Hellosss
		</div>
	);
}
