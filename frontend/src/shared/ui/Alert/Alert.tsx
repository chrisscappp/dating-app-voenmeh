import { CSSProperties, memo } from "react"
import { classNames, Mods } from "shared/lib/classNames/classNames"
import { Text, TextTheme } from "shared/ui/Text/Text"
import cls from "./Alert.module.scss"

export enum AlertTheme {
	DEFAULT = "default",
	SUCCESS = "success",
	WARNING = "warning",
	ERROR = "error"
}

export enum AlertPosition {
	TOP_LEFT = "top_left",
	TOP_RIGHT = "top_right",
	BOTTOM_LEFT = "bottom_left",
	BOTTOM_RIGHT = "bottom_right",
	CUSTOM = "custom"
}

interface AlertProps {
	className?: string;
	theme?: AlertTheme;
	text?: string;
	isOpen?: boolean;
	position?: AlertPosition
	top?: string | number;
	right?: string | number;
	left?: string | number;
	bottom?: string | number;
}

export const Alert = memo((props: AlertProps) => {
	
	const {
		className,
		text,
		theme = AlertTheme.DEFAULT,
		isOpen,
		position = AlertPosition.TOP_LEFT,
		top,
		bottom,
		left,
		right
	} = props

	const styles: CSSProperties = {
		top: top,
		right: right,
		left: left,
		bottom: bottom
	}

	const mods: Mods = {
		[cls[theme]]: true,
		[cls[position]]: (top || right || left || bottom) ? false : true,
		[cls.isOpen]: isOpen
	}

	return (
		<div style = {styles} className = {classNames(cls.Alert, mods, [className])}>
			<Text
				text = {text}
				theme = {TextTheme.PRIMARY}
			/>
		</div>
	)
})