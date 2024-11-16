import "../style.css";

import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";

registerBlockType(metadata.name, { edit: EditComponent });

function EditComponent(props) {
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
			</InspectorControls>
			<div {...useBlockProps()}>
				<div className="my-unique-plugin-wrapper-class">
					<div
						className={`${props.attributes.class} bg-red-200 border-2 border-blue-300 rounded-md p-5`}
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
