import { CSSProperties, memo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Skeleton.module.scss"

interface SkeletonProps {
	className?: string;
	width: number | string;
	height: number | string;
	border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
	
	const {
		height,
		width,
		border,
		className
	} = props

	const styles: CSSProperties = {
		height,
		width,
		borderRadius: border || 0
	}
	
	return (
		<div className = {classNames(cls.Skeleton, {}, [])} style = {styles}>
		
		</div>
	)
})