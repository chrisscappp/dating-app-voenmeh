import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Text.module.scss"

export enum TextTheme {
	PRIMARY = "primary",
	SECONDARY = "secondary"
}

export enum TextSize {
	S = "size_s",
	M = "size_m",
	ML = "size_ml",
	L = "size_l",
	XL = "size_xl",
	XXL = "size_xxl"
}

export enum TextAlign {
	LEFT = "align_left",
	RIGHT = "align_right",
	CENTER = "align_center",
}

interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	subTitle?: string;
	align?: TextAlign;
	theme?: TextTheme;
	size?: TextSize;
}

export const Text = (props: TextProps) => {

	const {
		className,
		text,
		subTitle,
		align = TextAlign.LEFT,
		theme = TextTheme.PRIMARY,
		title,
		size = TextSize.M
	} = props

	const mods = {
		[cls[theme]]: true,
		[cls[size]]: true,
		[cls[align]]: true
	}
	
	return (
		<div className = {classNames(cls.Text, mods, [className])}>
			{title && <p className = {cls.title}>{title}</p>}
			{subTitle && <p className = {cls.subTitle}>{subTitle}</p>}
			{text && <p className = {cls.text}>{text}</p>}
		</div>
	)
}
