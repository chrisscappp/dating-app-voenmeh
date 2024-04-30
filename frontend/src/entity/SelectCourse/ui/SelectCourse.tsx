import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./SelectCourse.module.scss"
import React, { memo, useCallback}  from "react"
import { Select, SelectOption } from "shared/ui/Select/Select"
import { Courses } from "../model/types"
import { Input } from "shared/ui/Input/Input"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { useMobile } from "shared/lib/hooks/useMobile"

interface SelectCourseProps {
	className?: string;
	onChange?: (value: Courses) => void;
	value?: string,
	readonly?: boolean,
	label?: string;
}

const faluctetOptions: SelectOption[] = [
	{value: Courses.EMPTY, content: Courses.EMPTY},
	{value: Courses.FIRST, content: Courses.FIRST},
	{value: Courses.SECOND, content: Courses.SECOND},
	{value: Courses.THIRD, content: Courses.THIRD},
	{value: Courses.FOUR, content: Courses.FOUR},
	{value: Courses.FIVED, content: Courses.FIVED},
]

export const SelectCourse = memo((props: SelectCourseProps) => {

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
		onChange?.(value as Courses)
	}, [onChange])

	const selectMods: Mods = {
		[cls.mobile]: mobile
	}

	return (
		<div className = {classNames(cls.selectWrap, {}, [className])}>
			<Input
				value = {t("Курс") + ` ${value === "undefined" ? "0" : value}`}
				className = {cls.faluctetInput}
				readonlyForProfile = {readonly}
				readonly
			/>
			<Select
				className = {classNames(cls.selectCourse, selectMods, [])}
				options={faluctetOptions}
				onChange={onChangeHandler}
				value = {value}
				readonly = {readonly}
			/>
		</div>
	)
})