import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import cls from "./AnketsList.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { fetchAnkets } from "../../model/services/fetchAnkets/fetchAnkets"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect"
import { getAnketsList, anketsListActions } from "../../model/slice/anketsSlice/anketsSlice"
import { useSelector } from "react-redux"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { EmptyAnkets } from "../EmptyAnkets/EmptyAnkets"
import { AnketCard } from "../AnketCard/AnketCard"
import { SwippedButtons } from "entity/SwippedButtons"
import { getAnketsListError } from "../../model/selectors/getAnketsListError/getAnketsListError"
import { getAnketsListIsLoading } from "../../model/selectors/getAnketsListIsLoading/getAnketsListIsLoading"
import { AnketsEndpoints } from "shared/config/anketsListConfig/anketsListConfig"

interface AnketsListProps {
	className?: string;
	endpoint: AnketsEndpoints;
	crossBtn?: boolean;
	questionBtn?: boolean;
	likeBtn?: boolean;
	wrongBtn?: boolean;
	vkBtn?: boolean;
	telegramBtn?: boolean;
}

export const AnketsList = memo((props: AnketsListProps) => {

	const {
		endpoint,
		className,
		crossBtn = false,
		likeBtn = false,
		questionBtn = false,
		wrongBtn = false,
		telegramBtn = false,
		vkBtn = false,
	} = props

	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const ankets = useSelector(getAnketsList.selectAll)
	const error = useSelector(getAnketsListError)
	const isLoading = useSelector(getAnketsListIsLoading)

	useInitialEffect(() => {
		dispatch(fetchAnkets(endpoint))
	})

	if (isLoading) {
		return (
			<div className = {classNames(cls.AnketsList, {}, [className])}>
				<Skeleton
					width = {500}
					height = {550}
					border = "10px"
					className = {cls.card}
				/>
				<Skeleton
					width = {500}
					height = {550}
					border = "10px"
					className = {cls.card}
				/>
				<Skeleton
					width = {500}
					height = {550}
					border = "10px"
					className = {cls.card}
				/>	
			</div>
		)
	}

	if (error) {
		<div className = {classNames(cls.AnketsList, {}, [className])}>
			<Text
				size = {TextSize.ML}
				theme = {TextTheme.ERROR}
				text = {t(error)}
			/>
		</div>
	}
	
	return (
		<div className = {classNames(cls.AnketsList, {}, [className])}>
			{ankets.length > 0 ? ankets.map(item => {
				return (
					<div className = {cls.card} key = {item.login}>
						<AnketCard
							user = {item}
						/>
						<SwippedButtons
							mountCross = {crossBtn}
							mountQuestion = {questionBtn}
							mountLike = {likeBtn}
							mountWrong = {wrongBtn}
							mountTelegram = {telegramBtn}
							mountVK = {vkBtn}
							viewId = {item.userId}
							className = {cls.btns}
						/>
					</div>
				)
			}) 
				:
				<EmptyAnkets/>
			}
		</div>
	)
})