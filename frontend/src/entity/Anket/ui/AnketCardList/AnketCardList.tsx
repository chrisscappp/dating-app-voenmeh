import { classNames } from "shared/lib/classNames/classNames"
import cls from "./AnketCardList.module.scss"
import { AnketCard } from "../AnketCard/AnketCard"

interface AnketCardProps {
	className?: string;
}

export const AnketCardList = (props: AnketCardProps) => {

	const {
		className
	} = props

	return (
		<div className = {classNames(cls.AnketCardList, {}, [className])}>
			<AnketCard 
				className = {cls.card}
			/>
			<AnketCard 
				className = {cls.card}
			/>
			<AnketCard 
				className = {cls.card}
			/>
		</div>
	)
}