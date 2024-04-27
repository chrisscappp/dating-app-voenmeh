import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./Select.module.scss"
import React, { ChangeEvent, memo, useMemo, useState }  from "react"
import { useTranslation } from "react-i18next"

export interface SelectOption {
	value: string;
	content: string;
}

interface SelectProps {
	className?: string;
	label?: string;
	options?: SelectOption[];
	value?: string;
	onChange?: (value: string) => void;
	readonly?: boolean;
	customSize?: boolean;
}

export const Select = memo((props: SelectProps) => {

	const { t } = useTranslation()
	const [ size, setSize ] = useState<number>(1)

	const { 
		className, 
		label, 
		options,
		onChange,
		value,
		readonly,
		customSize = false
	} = props

	const mods: Mods = {}

	const optionList = useMemo(() => {
		return options?.map((item) => {
			return (
				<option
					key = {item.value}
					value = {item.value}
					className = {cls.option}
				>
					{t(item.content)}
				</option>
			)
		})
	}, [options, t])

	const onChangeSize = (val: number) => {
		setSize(val)
	}

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value)
	}

	return (
		<div className = {classNames(cls.SelectWrapper, mods, [className])}>
			{
				label &&
				(<span className = {cls.label}>
					{label}
				</span>)
			}
			<select
				className = {cls.select}
				value = {value}
				onChange = {onChangeHandler}
				disabled = {readonly}
				onFocus = {() => customSize && onChangeSize(5)}
				onBlur = {() => customSize && onChangeSize(1)}
				size = {size}
			>
				{optionList}
			</select>
		</div>
	)
})