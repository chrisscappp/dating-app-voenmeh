import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./SelectSex.module.scss"
import React, { memo, useCallback}  from "react";
import { Select, SelectOption } from "shared/ui/Select/Select";
import { Sex } from "../model/types"
import { Input } from "shared/ui/Input/Input";

interface SelectSexProps {
	className?: string;
	onChange?: (value: Sex) => void;
	value?: string,
	readonly?: boolean,
	label?: string;
}

const sexOptions: SelectOption[] = [
	{value: "", content: ""},
	{value: Sex.FEMALE, content: Sex.FEMALE},
	{value: Sex.MALE, content: Sex.MALE},
]

export const SelectSex = memo((props: SelectSexProps) => {

	const { 
		className,
		onChange,
		value,
		readonly,
		label
	} = props

	const mods: Mods = {}

	const onChangeHandler = useCallback((value: string) => {
		onChange?.(value as Sex)
	}, [onChange])

	return (
		<div className = {cls.selectWrap}>
			<Input
				placeholder = {label}
				value = {value}
				readonly
			/>
			<Select
				className = {classNames(cls.selectSex, mods, [className])}
				options={sexOptions}
				onChange={onChangeHandler}
				value = {value}
				readonly = {readonly}
			/>
		</div>
	)
})