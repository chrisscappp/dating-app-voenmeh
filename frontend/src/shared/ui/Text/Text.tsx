import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Text.module.scss"

export enum TextTheme {
	PRIMARY = "primary",
	SECONDARY = "secondary"
}

export enum TextSize {
	S = "size_s",
	M = "size_m",
	L = "size_l",
	XL = "size_xl",
}

interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	theme?: TextTheme;
	size?: TextSize;
}

export const Text = (props: TextProps) => {

	const {
		className,
		text,
		theme = TextTheme.PRIMARY,
		title,
		size = TextSize.M
	} = props

	const mods = {
		[cls[theme]]: true,
		[cls[size]]: true
	}
	
	return (
		<div className = {classNames(cls.Text, mods, [className])}>
			{title && <p className = {cls.title}>{title}</p>}
			{text && <p className = {cls.text}>{text}</p>}
		</div>
	)
}
