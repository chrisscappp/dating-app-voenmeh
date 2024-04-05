import { classNames } from "shared/lib/classNames/classNames"
import cls from "./CheckBox.module.scss"
import React, { memo } from "react"

interface CheckBoxProps {
	className?: string;
	label?: string;
	value?: boolean;
	onChange?: () => void;
}

export const CheckBox = memo((props: CheckBoxProps) => {

	const {
		className,
		onChange,
		value
	} = props

	return (
		<input 
			className = {classNames(cls.CheckBox, {}, [className])}
			type="checkbox" 
			id="coding" 
			name="interest" 
			value="coding" 
			checked = {value}
			onChange={onChange}
		/>
	)
})