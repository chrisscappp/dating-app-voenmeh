import { classNames } from "shared/lib/classNames/classNames"
import cls from "./AnketCardList.module.scss"
import { AnketCard } from "../AnketCard/AnketCard"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { getAnketsPageUsers } from "../../model/selectors/getAnketsPageUsers/getAnketsPageUsers"
import { getAnketsPageIsLoading } from "../../model/selectors/getAnketsPageIsLoading/getAnketsPageIsLoading"
import { getAnketsPageError } from "../../model/selectors/getAnketsPageError/getAnketsPageError"
import { memo, useEffect } from "react"
import { fetchAnketsBySection } from "../../model/services/fetchAnketsBySection/fetchAnketsBySection"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import { isSectionId } from "shared/lib/typeGuards/isSectionId"

interface AnketCardProps {
	className?: string;
	sectionId?: string; 
}

export const AnketCardList = memo((props: AnketCardProps) => {

	const {
		className,
		sectionId
	} = props

	const dispatch = useAppDispatch()
	const ankets = useSelector(getAnketsPageUsers)
	const isLoading = useSelector(getAnketsPageIsLoading)
	const error = useSelector(getAnketsPageError)

	useEffect(() => {
		if (isSectionId(sectionId)) {
			dispatch(fetchAnketsBySection(sectionId))
		}
	}, [dispatch, sectionId])

	if (isLoading) {
		return (
			<div className = {classNames(cls.AnketCardList, {}, [className])}>
				<Skeleton
					className = {cls.card}
					width = {520}
					height = {400}
					border = {"10px"}
				/>
				<Skeleton
					className = {cls.card}
					width = {520}
					height = {400}
					border = {"10px"}
				/>
				<Skeleton
					className = {cls.card}
					width = {520}
					height = {400}
					border = {"10px"}
				/>
			</div>
		)
	}

	if (error) {
		return (
			<div className = {classNames(cls.AnketCardList, {}, [className])}>
				<Text 
					className = {cls.error}
					text = {error} 
					theme = {TextTheme.ERROR} 
					size = {TextSize.ML}
				/>
			</div>
		)
	}

	return (
		<div className = {classNames(cls.AnketCardList, {}, [className])}>
			{
				ankets ? ankets.map((item) => {
					return (
						<AnketCard 
							key = {item.login}
							user = {item}
							className = {cls.card}
						/>
					)
				})
					: <Text 
						className = {cls.emptyText}
						text = {"Список анкет пуст :("} 
						size = {TextSize.ML}
					/>
			}
		</div>
	)
})