import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import cls from "./LikedAnketsList.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { fetchAnkets } from "../../model/services/fetchAnkets/fetchAnkets"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect"
import { getLikedAnkets, likedAnketsActions } from "../../model/slice/likedAnketsSlice/likedAnketsSlice"
import { useSelector } from "react-redux"
import { getLikedAnketsError } from "../../model/selectors/getLikedAnketsError/getLikedAnketsError"
import { getLikedAnketsIsLoading } from "../../model/selectors/getLikedAnketsIsLoading/getLikedAnketsIsLoading"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { EmptyAnkets } from "../EmptyAnkets/EmptyAnkets"
import { AnketCard } from "../AnketCard/AnketCard"
import { SwippedButtons } from "entity/SwippedButtons"

export const LikedAnketsList = memo(() => {

	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const likedAnkets = useSelector(getLikedAnkets.selectAll)
	const error = useSelector(getLikedAnketsError)
	const isLoading = useSelector(getLikedAnketsIsLoading)

	useInitialEffect(() => {
		dispatch(fetchAnkets("likedAnkets"))
	})

	const onDislikeAnket = useCallback((id: string) => {
		dispatch(likedAnketsActions.dislikeAnket(id))
	}, [dispatch])

	if (isLoading) {
		return (
			<div className = {classNames(cls.LikedAnketsList, {}, [])}>
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
		<div className = {classNames(cls.LikedAnketsList, {}, [])}>
			<Text
				size = {TextSize.ML}
				theme = {TextTheme.ERROR}
				text = {t(error)}
			/>
		</div>
	}
	
	return (
		<div className = {classNames(cls.LikedAnketsList, {}, [])}>
			{likedAnkets ? likedAnkets.map(item => {
				return (
					<div className = {cls.card} key = {item.login}>
						<AnketCard
							user = {item}
						/>
						<SwippedButtons
							mountCross	
							mountQuestion
							mountWrong
							viewId = {item.userId}
							className = {cls.btns}
							callback = {onDislikeAnket}
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