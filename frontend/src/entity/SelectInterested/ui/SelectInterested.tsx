import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./SelectInterested.module.scss"
import React, { memo, useCallback, useMemo}  from "react"
import { Select, SelectOption } from "shared/ui/Select/Select"
import { SelectInterestedItem } from "../model/types"

interface SelectSexProps {
	className?: string;
	onChange?: (value: string[]) => void;
	value?: string,
	readonly?: boolean,
	label?: string;
	data?: string[];
}

const interestedOptions: SelectOption[] = [
	{value: "empty", content: "Раздел"},
	{value: SelectInterestedItem.FACULTET_A, content: SelectInterestedItem.FACULTET_A},
	{value: SelectInterestedItem.FACULTET_E, content: SelectInterestedItem.FACULTET_E},
	{value: SelectInterestedItem.FACULTET_I, content: SelectInterestedItem.FACULTET_I},
	{value: SelectInterestedItem.FACULTET_O, content: SelectInterestedItem.FACULTET_O},
	{value: SelectInterestedItem.FACULTET_R, content: SelectInterestedItem.FACULTET_R},
	{value: SelectInterestedItem.FEMALES, content: SelectInterestedItem.FEMALES},
	{value: SelectInterestedItem.FOREIGNERS, content: SelectInterestedItem.FOREIGNERS},
	{value: SelectInterestedItem.FRIENDS, content: SelectInterestedItem.FRIENDS},
	{value: SelectInterestedItem.MALES, content: SelectInterestedItem.MALES},
]

export const SelectInterested = memo((props: SelectSexProps) => {

	const { 
		className,
		onChange,
		value,
		readonly,
		label,
		data
	} = props

	const onChangeHandler = useCallback((value: string) => {
		const copyData = data ? [...data] : []
		copyData.push(value)
		onChange?.(copyData)
	}, [data, onChange])

	const filteredOptions = useMemo(() => {
		const newData: SelectOption[] = []
		interestedOptions.forEach(item => {
			const fnd = data?.find(i => item.content === i)
			if (!fnd) {
				newData.push(item)
			}
		})
		return newData
	}, [data])

	const mods: Mods = {}

	return (
		<div className = {cls.selectWrap}>
			<Select
				className = {classNames(cls.selectFaluctet, mods, [className])}
				options={filteredOptions}
				onChange={onChangeHandler}
				value = {value}
				readonly = {readonly}
			/>
		</div>
	)
})