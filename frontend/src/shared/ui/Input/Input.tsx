import { classNames, Mods } from "shared/lib/classNames/classNames"
import { ChangeEvent, CSSProperties, InputHTMLAttributes, memo, useEffect, useRef, useState } from "react"
import cls from "./Input.module.scss"
import React from "react"

export enum InputTheme {
	DEFAULT = "default",
	PROFILE_BLOCK = "profile_block"
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "readOnly">

interface InputProps extends HTMLInputProps {
	className?: string,
	value?: string | number,
	placeholder?: string,
	type?: string,
	onChange?: (value: string) => void,
	readonly?: boolean,
	readonlyForProfile?: boolean,
	autoFocus?: boolean
	theme?: InputTheme
}

export const Input = memo((props: InputProps) => {

	const { 
		className,
		value,
		placeholder,
		autoFocus,
		type,
		onChange,
		readonly,
		readonlyForProfile,
		theme = InputTheme.DEFAULT
	} = props

	const [styles, setStyles] = useState<CSSProperties>()
	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (autoFocus) {
			ref.current?.focus()
		}
	}, [autoFocus])

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value)
	}

	const onFocus = () => {
		if (!readonly) {
			setStyles({
				border: "2px solid var(--input-focus-border)"
			})
		}
	}

	const onBlur = () => {
		setStyles({})
	}

	const mods: Mods = {
		[cls.readonly]: readonly,
		[cls.readonlyForProfile]: readonlyForProfile,
		[cls[theme]]: true
	}

	return (
		<input 
			ref = {ref}
			className = {classNames(cls.Input, mods, [className])}
			style = {styles}
			value = {value}
			placeholder = {placeholder || "Текст"}
			onChange = {onChangeHandler}
			readOnly = {readonly}
			type = {type || "text"}
			onBlur = {onBlur}
			onFocus = {onFocus}
		></input>
	)
})