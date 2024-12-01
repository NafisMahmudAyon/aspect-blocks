import { Switch } from "aspect-ui/Switch";
import React from "react";

const SwitchData = ({ label, val, update }) => {
	return (
		<Switch
			className="w-full inline-flex flex-row-reverse gap-3 justify-between"
			labelClassName="text-primary-900 dark:text-primary-900 ml-0 font-medium text-[11px]"
			activeClassName="bg-primary-900 dark:bg-primary-900"
			deactiveClassName="bg-primary-200 dark:bg-primary-200"
			deactiveSwitchClassName="bg-primary-900 dark:bg-primary-900"
			activeSwitchClassName="bg-primary-200 dark:bg-primary-200"
			checked={val}
			onChange={update}
			label={label}
		/>
	);
};

export default SwitchData;
