import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./Select.module.scss"
import React, { ChangeEvent, memo, useMemo }  from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"

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
}

export const Select = memo((props: SelectProps) => {

	const { t } = useTranslation(TranslationKeys.MAIN_PAGE)

	const { 
		className, 
		label, 
		options,
		onChange,
		value,
		readonly
	} = props

	const mods: Mods = {}

	const optionList = useMemo(() => {
		return options?.map((item) => {
			return (
				<option
					key = {item.value}
					value = {t(item.value)}
					className = {cls.option}
				>
					{t(item.content)}
				</option>
			)
		})
	}, [options, t])

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
			>
				{optionList}
			</select>
		</div>
	)
})