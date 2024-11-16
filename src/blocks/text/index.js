import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import { InspectorControls } from "@wordpress/block-editor";
registerBlockType(metadata, {
	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff0",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#fff",
		// Specifying an icon for the block
		src: (
			<svg
				width="161"
				height="160"
				viewBox="0 0 161 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M160.294 62H85V71.4118H160.294V62Z"
					fill="url(#paint0_linear_61_930)"
				/>
				<path
					d="M160.294 80.8823H85.2939V89.8823H160.294V80.8823Z"
					fill="#C15940"
				/>
				<path
					d="M131.294 99.8823H85.2939V108.882H131.294V99.8823Z"
					fill="#C15940"
				/>
				<path
					d="M68.0095 79.9611C65.7484 79.9611 63.922 81.7874 63.922 84.0486V114.836H8.26203V59.1756H39.0491C41.3103 59.1756 43.1366 57.3492 43.1366 55.088C43.1366 52.8268 41.3103 51.0005 39.0491 51.0005H7.04456C3.13096 51.0005 0 54.1313 0 58.0449V116.14C0 120.054 3.13096 123.185 7.04456 123.185H65.1397C69.0533 123.185 72.1841 120.054 72.1841 116.14V84.1356C72.0971 81.7874 70.2707 79.9611 68.0095 79.9611Z"
					fill="url(#paint1_linear_61_930)"
				/>
				<path
					d="M73.8365 60.8279L62.1826 49.1741C60.6171 47.6086 58.0081 47.6086 56.3557 49.1741L21.4811 84.0485C20.6984 84.8313 20.2637 85.8749 20.2637 87.0055V98.6593C20.2637 100.921 22.09 102.747 24.3512 102.747H36.0051C37.1357 102.747 38.1792 102.312 38.8749 101.529L73.7495 66.6548C75.4019 65.0024 75.402 62.3934 73.8365 60.8279ZM56.3557 72.3947L34.3526 94.3978H28.5257V88.5709L50.5288 66.5678L56.3557 72.3947ZM65.0526 63.6978L62.1826 66.5678L56.3557 60.7409L59.2257 57.871L65.0526 63.6978Z"
					fill="url(#paint2_linear_61_930)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_930"
						x1="85"
						y1="66.7059"
						x2="160.294"
						y2="66.7059"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_930"
						x1="0"
						y1="87.0925"
						x2="72.1841"
						y2="87.0925"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_930"
						x1="20.2637"
						y1="75.3734"
						x2="74.9999"
						y2="75.3734"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
	edit: function (props) {
		var attributes = props.attributes;
		var setAttributes = props.setAttributes;
		var context = props.context;
		var clientId = props.clientId;
		var blockName = props.name;
		var blockNameLast = blockName.split("/")[1];
		var text = attributes.text;
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">hello</div>
				</InspectorControls>
				Hello
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
