import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./SelectFaluctet.module.scss"
import React, { memo, useCallback }  from "react"
import { Select, SelectOption } from "shared/ui/Select/Select"
import { FaluctetsItem } from "shared/consts/faluctets"
import { Input } from "shared/ui/Input/Input"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { useMobile } from "shared/lib/hooks/useMobile"

interface SelectSexProps {
	className?: string;
	onChange?: (value: FaluctetsItem) => void;
	value?: string,
	readonly?: boolean,
	label?: string;
}

const faluctetOptions: SelectOption[] = [
	{value: FaluctetsItem.EMPTY, content: FaluctetsItem.EMPTY},
	{value: FaluctetsItem.A, content: FaluctetsItem.A},
	{value: FaluctetsItem.E, content: FaluctetsItem.E},
	{value: FaluctetsItem.I, content: FaluctetsItem.I},
	{value: FaluctetsItem.O, content: FaluctetsItem.O},
	{value: FaluctetsItem.R, content: FaluctetsItem.R},
]

export const SelectFacultet = memo((props: SelectSexProps) => {

	const { 
		className,
		onChange,
		value,
		readonly,
		label
	} = props

	const { t } = useTranslation(TranslationKeys.PROFILE_PAGE)
	const mobile = useMobile()

	const onChangeHandler = useCallback((value: string) => {
		onChange?.(value as FaluctetsItem)
	}, [onChange])

	const selectMods: Mods = {
		[cls.mobile]: mobile
	}

	return (
		<div className = {cls.selectWrap}>
			<Input
				value = {t(`Факультет "${value ? value : ""}"`)}
				className = {cls.faluctetInput}
				readonlyForProfile = {readonly}
				readonly
			/>
			<Select
				className = {classNames(cls.selectFaluctet, selectMods, [className])}
				options={faluctetOptions}
				onChange={onChangeHandler}
				value = {value}
				readonly = {readonly}
			/>
		</div>
	)
})