import { Input } from 'aspect-ui/Input';
import React from 'react'

const InputData = ({val, update, label="ID", placeholder="id"}) => {
  return (
		<Input
			label={label}
			className="placeholder:text-primary-200"
			wrapperClassName="w-full inline-flex items-center gap-3 justify-between mb-0"
      labelClassName='mb-0 text-[11px]'
			icon={false}
			type="text"
			value={val}
			onChange={update}
			placeholder={placeholder}
		/>
	);
}

export default InputData