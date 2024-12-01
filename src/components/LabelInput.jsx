import { Input } from 'aspect-ui/Input';
import React from 'react'

const LabelInput = () => {
  return (
		<div>
			<Input
			wrapperClassName='flex items-center'
				className="mr-3 p-2 rounded-lg bg-red-500 text"
				label='ID'
				type="text"
				icon={false}
				// value={attributes.skyColor}
				// onChange={updateSkyColor}
				placeholder="sky color..."
			/>
		</div>
	);
}

export default LabelInput