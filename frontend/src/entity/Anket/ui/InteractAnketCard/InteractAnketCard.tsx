import React, { Dispatch, memo, SetStateAction, useCallback } from "react"
import cls from "./InteractAnketCard.module.scss"
import { IUser } from "entity/User"
import { AnketCard } from "../AnketCard/AnketCard"
import { dislikeAnketCard } from "../../model/services/dislikeAnket/dislikeAnket"
import { likeAnketCard } from "../../model/services/likeAnket/likeAnket"
import { SwippedButtons } from "entity/SwippedButtons"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { classNames } from "shared/lib/classNames/classNames"
import { RequestAnkets } from "entity/Anket/model/types/interactAnkets"

interface InteractAnketCardProps {
	className?: string;
	user?: IUser;
	topStack?: string;
	setTmpId?: Dispatch<SetStateAction<string>>;
	onOpenModal?: () => void;
}

export const InteractAnketCard = memo((props: InteractAnketCardProps) => {
	
	const {
		className,
		user,
		topStack,
		onOpenModal
	} = props

	const dispatch = useAppDispatch()

	const onDislikeAnket = useCallback(async () => {
		await dispatch(dislikeAnketCard(topStack ? topStack : ""))
	}, [dispatch, topStack])

	const onLikeAnket = useCallback(async () => {
		const response = await dispatch(likeAnketCard(topStack ? topStack : ""))
		if (response.meta.requestStatus === "fulfilled") {
			const res = response.payload as RequestAnkets
			if (res.sympathy) {
				await onOpenModal?.()
			}
		}
	}, [dispatch, onOpenModal, topStack])

	return (
		<div className = {classNames(cls.interact, {}, [className])}>
			<AnketCard
				onDislikeAnket = {onDislikeAnket}
				onLikeAnket = {onLikeAnket}
				user = {user}
				swiped
			/>
			<SwippedButtons
				mountCross
				mountLike
				mountQuestion
				mountWrong
				className = {cls.btns}
				viewId = {user?.userId}
				onOpenModal = {onOpenModal}
			/>
		</div>
	)
})