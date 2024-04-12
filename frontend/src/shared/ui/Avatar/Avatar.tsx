import { classNames, Mods } from "../../lib/classNames/classNames"
import { CSSProperties, memo, useMemo } from "react"
import cls from "./Avatar.module.scss"
import React from "react"
import AvatarImgDefault from "./avatar-default.png"
import { useHover } from "../../lib/hooks/useHover"

interface AvatarProps {
	className?: string;
	width?: number;
	height?: number;
	borderRadius?: string;
	src?: string;
	alt?: string;
}

export const Avatar = memo((props: AvatarProps) => {

	const { 
		className, 
		width = 100,
		height = 125,
		borderRadius = "5px",
		src = AvatarImgDefault,
		alt = "avatar"
	} = props

	const [isHover, onHovered] = useHover()

	const styles = useMemo<CSSProperties>(() => {
		return {
			width: width,
			height: height,
			borderRadius: borderRadius
		}
	}, [borderRadius, height, width])

	const mods: Mods = {
		//[cls.hovered]: isHover
	}

	return (
		<img 
			{...onHovered}
			className = {classNames(cls.Avatar, mods, [className])}
			style = {styles}
			src = {src}
			alt = {alt}
		/>
	)
})