import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./AnketsSectionList.module.scss"
import { AnketsSectionItem } from "../AnketsSectionItem/AnketsSectionItem"
import { sectionsConfig } from "../../model/config"
import React, { useMemo } from "react"
import { useMobile } from "shared/lib/hooks/useMobile"

interface AnketsSectionListProps {
	className?: string;
}

export const AnketsSectionList = (props: AnketsSectionListProps) => {

	const {
		className
	} = props

	const mobile = useMobile()

	const sections = useMemo(() => {
		return Object.values(sectionsConfig).map((item) => {
			return (
				<AnketsSectionItem
					className = {cls.card}
					key = {item.type}
					section = {item}
				/>
			)
		})
	}, [])

	const mods: Mods = {
		[cls.mobile]: mobile
	}

	return (
		<div className = {classNames(cls.AnketsSectionList, mods, [className])}>
			<div className = {cls.cardWrap}>
				{sections}
			</div>
		</div>
	)
}