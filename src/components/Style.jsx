import React, { useEffect, useState } from 'react'
import TailwindInput from './TailwindInput'
import FontSize from './fontSize'

const Style = ({update, val}) => {
  const [classes, setClasses] = useState(val || "");
  const handleUpdate = (updatedClasses) => {
		setClasses(updatedClasses);
	};
  useEffect(() => {
    update(classes)
  }, [classes]);
  return (
		<div>
			<TailwindInput update={handleUpdate} val={classes} />
			<FontSize update={handleUpdate} val={classes} />
		</div>
	);
}

export default Style