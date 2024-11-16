import "../style.css";

import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import { useEffect, useState } from "@wordpress/element";
import TailwindInput from "../../components/TailwindInput";

registerBlockType(metadata.name, { edit: EditComponent });

function EditComponent(props) {
	const [wrapperClass, setWrapperClass] = useState(props.attributes.class)
	useEffect(() => {
		setWrapperClass(props.attributes.class);
	}, [props.attributes.class]);
	function updateSkyColor(e) {
		props.setAttributes({ skyColor: e.target.value });
	}
	function updateClass(e) {
		props.setAttributes({ class: e.target.value });
	}

	function updateGrassColor(e) {
		props.setAttributes({ grassColor: e.target.value });
	}

	return (
		<>
			<InspectorControls>
				Hello
				<input
					className="mr-3 p-2 rounded-lg"
					type="text"
					value={props.attributes.class}
					onChange={updateClass}
					placeholder="sky color..."
				/>
				<TailwindInput />
			</InspectorControls>
			<div {...useBlockProps()}>
				<div className="my-unique-plugin-wrapper-class">
					<div
						className={`${wrapperClass} bg-red-200 border-2 border-blue-300 rounded-md p-5`}
					>
						Hello
						<input
							className="mr-3 p-2 rounded-lg"
							type="text"
							value={props.attributes.skyColor}
							onChange={updateSkyColor}
							placeholder="sky color..."
						/>
						<input
							className="mr-3 p-2 rounded-lg"
							type="text"
							value={props.attributes.grassColor}
							onChange={updateGrassColor}
							placeholder="grass color..."
						/>
					</div>
				</div>
			</div>
		</>
	);
}
