import { classNames } from "shared/lib/classNames/classNames"
import cls from "./AnketsSectionList.module.scss"
import { AnketsSectionItem } from "../AnketsSectionItem/AnketsSectionItem"
import { sectionsConfig } from "../../model/config"

interface AnketsSectionListProps {
	className?: string;
}

export const AnketsSectionList = (props: AnketsSectionListProps) => {

	const {
		className
	} = props

	return (
		<div className = {classNames(cls.AnketsSectionList, {}, [className])}>
			<div className = {cls.cardWrap}>
				{Object.values(sectionsConfig).map((item) => {
					return (
						<AnketsSectionItem
							className = {cls.card}
							key = {item.type}
							section = {item}
						/>
					)
				})}
			</div>
		</div>
	)
}