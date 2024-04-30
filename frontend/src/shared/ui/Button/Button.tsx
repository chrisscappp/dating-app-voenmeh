import { classNames, Mods } from "shared/lib/classNames/classNames"
import { ButtonHTMLAttributes, ReactNode, memo } from "react"
import cls from "./Button.module.scss"
import React from "react"

export enum ButtonTheme {
	CLEAR = "clear",
	CLEAR_INVERTED = "clearInverted",
	ERROR = "error",
	OUTLINE = "outline",
	OUTLINE_INVERTED = "outlineInverted",
	BACKGROUND = "background",
	BACKGROUND_INVERTED = "backgroundInverted",
	BACKGROUND_INVERTED_TEXT = "backgroundInvertedText",
	ACCESS = "access",
	MONO = "mono"
}

export enum ButtonSize {
	S = "size_s",
	M = "size_m",
	L = "size_l",
	XL = "size_xl"
}

export enum CircleSize {
	S = "circle_s",
	M = "circle_m",
	L = "circle_l",
	XL = "circle_xl",
	XXL = "circle_xxl"
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ButtonTheme;
	circle?: boolean;
	size?: ButtonSize;
	disabled?: boolean;
	hoveredTheme?: ButtonTheme;
	hovered?: boolean;
	circleSize?: CircleSize;
	children?: ReactNode;
} // специальный тип html тега

export const Button = memo((props: ButtonProps) => {

	const { 
		className, 
		theme = ButtonTheme.BACKGROUND,
		children, 
		circle,
		disabled,
		hoveredTheme,
		hovered,
		size = ButtonSize.M,
		circleSize = CircleSize.M,
		...otherProps
	} = props

	const mods: Mods = {
		[cls[theme]]: true,
		[cls.circle]: circle,
		[cls[size]]: !circle ? true : false,
		[cls[circleSize]]: circle,
		[cls.disabled]: disabled,
		[cls.hovered]: hovered
	}

	return (
		<button 
			className = {classNames(cls.Button, mods, [className])}
			disabled = {disabled}
			{...otherProps}
		>
			{children}
		</button>
	)
})