import { classNames } from "shared/lib/classNames/classNames"
import cls from "./SelectHobbies.module.scss"
import React, { Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo, useState}  from "react"
import { Select, SelectOption } from "shared/ui/Select/Select"
import { BaseHobbies } from "../model/types"
import { Input } from "shared/ui/Input/Input"
import { Button, ButtonTheme, CircleSize } from "shared/ui/Button/Button"

interface SelectHobbiesProps {
	isError: boolean;
	setIsError: Dispatch<SetStateAction<boolean>>;
	className?: string;
	onChange?: (value: string[]) => void;
	value?: string,
	readonly?: boolean,
	label?: string;
	data?: string[];
}

const hobbiesOptions: SelectOption[] = [
	{value: "empty", content: "Хобби"},
	{value: BaseHobbies.BOOKS, content: "Книги"},
	{value: BaseHobbies.CINEMA, content: "Кино"},
	{value: BaseHobbies.COOKING, content: "Готовка"},
	{value: BaseHobbies.EXHIBITIONS, content: "Выставки"},
	{value: BaseHobbies.MUSIC, content: "Музыка"},
	{value: BaseHobbies.PAINTING, content: "Рисование"},
	{value: BaseHobbies.SPORT, content: "Спорт"},
	{value: BaseHobbies.TRAVEL, content: "Путешествия"},
	{value: BaseHobbies.WALK, content: "Прогулки"},
]

export const SelectHobbies = memo((props: SelectHobbiesProps) => {

	const { 
		className,
		isError,
		setIsError,
		onChange,
		value,
		readonly,
		label,
		data
	} = props

	const [ customHobbie, setCustomHobbie ] = useState<string>()
 
	const onChangeCustomHobbie = useCallback((value: string) => {
		setCustomHobbie(value)
		if (isError) {
			setIsError(false)
		}
	}, [isError, setIsError])

	const onChangeHandler = useCallback((value: string) => {
		const copyData = data ? [...data] : []
		copyData.push(value)
		onChange?.(copyData)
	}, [data, onChange])

	const onChangeCustomHobbieHandler = useCallback(() => {
		if (customHobbie) {
			const fnd = data?.find(i => customHobbie.toLowerCase() === i.toLowerCase())
			if (!fnd) {
				onChangeHandler(customHobbie)
				setCustomHobbie("")
				if (isError) {
					setIsError(false)
				}
			} else {
				setIsError(true)
			}
		}
	}, [customHobbie, data, isError, onChangeHandler, setIsError])

	const filteredOptions = useMemo(() => {
		const newData: SelectOption[] = []
		hobbiesOptions.forEach(item => {
			const fnd = data?.find(i => item.content.toLowerCase() === i.toLowerCase())
			if (!fnd) {
				newData.push(item)
			}
		})
		return newData
	}, [data])

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === "Enter") {
			onChangeCustomHobbieHandler()
		}
	}, [onChangeCustomHobbieHandler])

	useEffect(() => {
		window.addEventListener("keydown", onKeyDown)
		return () => {
			setIsError(false)
			removeEventListener("keydown", onKeyDown)
		}
	}, [onKeyDown, setIsError])

	return (
		<div className = {cls.selectWrap}>
			<div className = {cls.changeElemsWrap}>
				<Select
					className = {classNames(cls.selectHobbies, {}, [className])}
					options={filteredOptions}
					onChange={onChangeHandler}
					value = {value}
					readonly = {readonly}
					customSize
				/>
				<div className = {cls.inputWrap}>
					<Input
						placeholder = "какое у вас хобби?"
						className = {cls.inputHobbie}
						value = {customHobbie}
						onChange = {onChangeCustomHobbie}
						readonly = {readonly}
					/>
					<Button
						onClick = {onChangeCustomHobbieHandler}
						className = {cls.addBtn}
						circle
						circleSize = {CircleSize.M}
						theme = {ButtonTheme.BACKGROUND_INVERTED}
					>
							+
					</Button>
				</div>
			</div>
		</div>
	)
})