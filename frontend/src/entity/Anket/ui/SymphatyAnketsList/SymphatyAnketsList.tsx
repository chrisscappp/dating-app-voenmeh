import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import cls from "./SymphatyAnketsList.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { fetchAnkets } from "../../model/services/fetchAnkets/fetchAnkets"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect"
import { getSymphatyAnkets, symphatyAnketsActions } from "../../model/slice/symphatySlice/symphatySlice"
import { useSelector } from "react-redux"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { EmptyAnkets } from "../EmptyAnkets/EmptyAnkets"
import { AnketCard } from "../AnketCard/AnketCard"
import { SwippedButtons } from "entity/SwippedButtons"
import { getSymphatyAnketsError } from "../../model/selectors/getSymphatyAnketsError/getSymphatyAnketsError"
import { getSymphatyAnketsIsLoading } from "../../model/selectors/getSymphatyAnketsIsLoading/getSymphatyAnketsIsLoading"

export const SymphatyAnketsList = memo(() => {

	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const symphatyAnkets = useSelector(getSymphatyAnkets.selectAll)
	const error = useSelector(getSymphatyAnketsError)
	const isLoading = useSelector(getSymphatyAnketsIsLoading)

	useInitialEffect(() => {
		dispatch(fetchAnkets("sympathies"))
	})

	// const onDislikeAnket = useCallback((id: string) => {
	// 	dispatch(likedAnketsActions.dislikeAnket(id))
	// }, [dispatch])

	if (isLoading) {
		return (
			<div className = {classNames(cls.SymphatyAnketsList, {}, [])}>
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
		<div className = {classNames(cls.SymphatyAnketsList, {}, [])}>
			<Text
				size = {TextSize.ML}
				theme = {TextTheme.ERROR}
				text = {t(error)}
			/>
		</div>
	}
	
	return (
		<div className = {classNames(cls.SymphatyAnketsList, {}, [])}>
			{symphatyAnkets ? symphatyAnkets.map(item => {
				return (
					<div className = {cls.card} key = {item.login}>
						<AnketCard
							user = {item}
						/>
						<SwippedButtons
							mountCross	
							mountQuestion
							mountLike
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