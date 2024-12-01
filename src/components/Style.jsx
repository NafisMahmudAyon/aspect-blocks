import React, { useEffect, useState } from "react";
import TailwindInput from "./TailwindInput";
import FontSize from "./FontSize";
import Weight from "./Weight";
import TextAlign from "./TextAlign";
import Spacing from "./Spacing";
import LineHeight from "./LineHeight";
import TextDecoration from "./TextDecoration";
import TextTransform from "./TextTransform";
import TextOverflow from "./TextOverflow";
import WordBreak from "./WordBreak";
import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import Display from "./Display";
import Width from "./Width";
import Height from "./Height";
// import MaxWidth from "./MaxWidth";
// import MaxHeight from "./MaxHeight";

const breakpoints = ["sm", "md", "desktop"]; // Responsive breakpoints

const Style = ({ update, val }) => {
	const [currentBreakpoint, setCurrentBreakpoint] = useState("desktop"); // Default is desktop
	const [classes, setClasses] = useState(val);

	// Handle updates for the current breakpoint
	const handleUpdate = (updatedClass) => {
		setClasses((prev) => ({
			...prev,
			[currentBreakpoint]: updatedClass,
		}));
	};
	const handleCustomUpdate = (updatedClass) => {
		setClasses((prev) => ({
			...prev,
			custom: updatedClass,
		}));
	};
	// const handleUpdate = (updatedClasses) => {
	// 	setClasses(updatedClasses);
	// };
	// useEffect(() => {
	// 	update(classes);
	// }, [classes]);

	// Update parent state when `classes` changes
	useEffect(() => {
		update(classes);
	}, [classes]);

	// Extract the classes for the current breakpoint or fallback to desktop
	const getClassesForBreakpoint = () => {
		if (currentBreakpoint === "desktop") return classes.desktop || "";
		return classes[currentBreakpoint] || "";
	};
	const getClassesForCustom = () => {
		return classes["custom"] || "";
	};

	// Toggle the current breakpoint
	const toggleBreakpoint = (bp) => setCurrentBreakpoint(bp);
	return (
		<div>
			{/* Breakpoint Selector */}
			<div className="flex justify-around mb-4">
				{breakpoints.map((bp) => (
					<button
						key={bp}
						className={`px-3 py-1 rounded ${
							currentBreakpoint === bp
								? "bg-primary-500 text-white"
								: "bg-gray-200 text-black"
						}`}
						onClick={() => toggleBreakpoint(bp)}
					>
						{bp}
					</button>
				))}
			</div>
			<TailwindInput update={handleCustomUpdate} val={getClassesForCustom()} />
			<Accordion
				iconEnabled={true}
				iconPosition="left"
				multiple={true}
				// activeItem={["item-1", "item-2", "item-3"]}
			>
				<AccordionItem id="item-1" className="border-0 pl-0">
					<AccordionHeader className="bg-transparent hover:bg-transparent pl-0 font-medium">
						Typography
					</AccordionHeader>
					<AccordionContent className="p-1 border-0 border-b pb-3 space-y-2 bg-transparent">
						<FontSize
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/>
						<Weight
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/>
						<TextAlign
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/>
						<TextDecoration
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/>
						<Spacing
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/>
						<LineHeight
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/>
						<TextTransform
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/>
						<TextOverflow
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/>
						<WordBreak
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem id="item-2" className="border-0 pl-0">
					<AccordionHeader className="bg-transparent hover:bg-transparent pl-0 font-medium">
						Layout
					</AccordionHeader>
					<AccordionContent className="p-1 border-0 border-b pb-3 space-y-2 bg-transparent">
						<Display
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem id="item-3" className="border-0 pl-0">
					<AccordionHeader className="bg-transparent hover:bg-transparent pl-0 font-medium">
						Size
					</AccordionHeader>
					<AccordionContent className="p-1 border-0 border-b pb-3 space-y-2 bg-transparent">
						<Width
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/>
						<Height
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/>
						{/* <MaxWidth
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/>
						<MaxHeight
							update={handleUpdate}
							val={getClassesForBreakpoint()}
							breakpoint={currentBreakpoint}
						/> */}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

window.tailwindBlocks = window.tailwindBlocks || {};

window.tailwindBlocks.Style = Style;

export default Style;
