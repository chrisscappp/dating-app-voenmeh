import { classNames } from "shared/lib/classNames/classNames"
import cls from "./CheckBox.module.scss"
import React, { memo } from "react";

interface CheckBoxProps {
	className?: string;
	label?: string;
	value?: string;
}

export const CheckBox = memo(({ className }: CheckBoxProps) => {

	return (
		<input 
			className = {classNames(cls.CheckBox, {}, [className])}
			type="checkbox" 
			id="coding" 
			name="interest" 
			value="coding" 
		/>
	)
})