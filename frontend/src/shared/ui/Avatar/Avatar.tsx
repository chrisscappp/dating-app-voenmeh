import { classNames } from "../../lib/classNames/classNames"
import { CSSProperties, memo, useMemo } from "react"
import cls from "./Avatar.module.scss"
import React from "react"
import AvatarImgDefault from "./avatar-default.png"

interface AvatarProps {
	className?: string;
	width?: number;
	height?: number;
	borderRadius?: string;
	avatarSrc?: string;
	alt?: string;
}

export const Avatar = memo((props: AvatarProps) => {

	const { 
		className, 
		width = 100,
		height = 125,
		borderRadius = "5px",
		avatarSrc = AvatarImgDefault,
		alt = "avatar"
	} = props

	const styles = useMemo<CSSProperties>(() => {
		return {
			width: width,
			height: height,
			borderRadius: borderRadius,
			background: `url(${avatarSrc}) center center/cover`,
		}
	}, [avatarSrc, borderRadius, height, width])

	return (
		<img 
			className = {classNames(cls.Avatar, {}, [className])}
			style = {styles}
			alt = {avatarSrc ? "" : alt}
		/>
	)
})