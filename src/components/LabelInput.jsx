import { Input } from 'aspect-ui/Input';
import React from 'react'

const LabelInput = () => {
  return (
		<div>
			<Input
				className="mr-3 p-2 rounded-lg"
				type="text"
				value={attributes.skyColor}
				onChange={updateSkyColor}
				placeholder="sky color..."
			/>
		</div>
	);
}

export default LabelInput