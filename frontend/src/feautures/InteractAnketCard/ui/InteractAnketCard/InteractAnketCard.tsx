import { Dispatch, memo, SetStateAction, useCallback } from "react"
import cls from "./InteractAnketCard.module.scss"
import { IUser } from "entity/User"
import { likeAnketCard, dislikeAnketCard, AnketCard } from "entity/Anket"
import { useMobile } from "shared/lib/hooks/useMobile"
import { SwippedButtons } from "entity/SwippedButtons"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { classNames } from "shared/lib/classNames/classNames"

interface InteractAnketCardProps {
	className?: string;
	user?: IUser;
	topStack?: string;
	setSwipeRight?: Dispatch<SetStateAction<boolean>>;
	setSwipeLeft?: Dispatch<SetStateAction<boolean>>;
}

export const InteractAnketCard = memo((props: InteractAnketCardProps) => {
	
	const {
		className,
		setSwipeLeft,
		setSwipeRight,
		user,
		topStack
	} = props

	const dispatch = useAppDispatch()
	const mobile = useMobile()

	const swipe = useCallback(async (dir: string) => {
		if (dir === "right") {
			setSwipeLeft?.(false)
			setSwipeRight?.(true)
			setTimeout(() => setSwipeRight?.(false), 3000)
		}
		if (dir === "left") {
			setSwipeRight?.(false)
			setSwipeLeft?.(true)
			setTimeout(() => setSwipeLeft?.(false), 3000)
		}
	}, [setSwipeLeft, setSwipeRight])

	const onDislikeAnket = useCallback(async () => {
		const response = await dispatch(dislikeAnketCard(topStack ? topStack : ""))
		if (response.meta.requestStatus === "fulfilled") {
			!mobile && swipe("left")
		}
	}, [dispatch, mobile, swipe, topStack])

	const onLikeAnket = useCallback(async () => {
		const response = await dispatch(likeAnketCard(topStack ? topStack : ""))
		if (response.meta.requestStatus === "fulfilled") {
			!mobile && swipe("right")
		}
	}, [dispatch, mobile, swipe, topStack])

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
				swipe = {swipe}
				className = {cls.btns}
			/>
		</div>
	)
})