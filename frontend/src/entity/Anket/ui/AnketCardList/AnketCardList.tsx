import { classNames } from "shared/lib/classNames/classNames"
import cls from "./AnketCardList.module.scss"
import { AnketCard } from "../AnketCard/AnketCard"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { getAnketsPageIsLoading } from "../../model/selectors/getAnketsPageIsLoading/getAnketsPageIsLoading"
import { getAnketsPageError } from "../../model/selectors/getAnketsPageError/getAnketsPageError"
import { memo, useCallback, useState } from "react"
import { fetchAnketsBySection } from "../../model/services/fetchAnketsBySection/fetchAnketsBySection"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import { isSectionId } from "shared/lib/typeGuards/isSectionId"
import { anketsPageActions, getAnketsList } from "../../model/slice/anketsSlice"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Alert, AlertTheme } from "shared/ui/Alert/Alert"
import { useMobile } from "shared/lib/hooks/useMobile"
import { SwippedButtons } from "entity/SwippedButtons"
import { getAnketsPageTopStack } from "../../model/selectors/getAnketsPageTopStack/getAnketsPageTopStack"
import { useNavigate } from "react-router"

interface AnketCardProps {
	className?: string;
	sectionId?: string; 
}

export const AnketCardList = memo((props: AnketCardProps) => {

	const {
		className,
		sectionId
	} = props

	const { t } = useTranslation(TranslationKeys.ANKETS_PAGE)
	const dispatch = useAppDispatch()
	const ankets = useSelector(getAnketsList.selectAll)
	const isLoading = useSelector(getAnketsPageIsLoading)
	const error = useSelector(getAnketsPageError)
	const topStack = useSelector(getAnketsPageTopStack)
	const [swipeRight, setSwipeRight] = useState<boolean>(false)
	const [swipeLeft, setSwipeLeft] = useState<boolean>(false)
	const mobile = useMobile()
	const navigate = useNavigate()

	useInitialEffect(() => {
		if (isSectionId(sectionId)) {
			dispatch(fetchAnketsBySection(sectionId))
		}
	})

	const viewProfile = () => {
		navigate(`/profile/${topStack}`)
		window.scrollTo({top: 0, behavior: "smooth"})
	}

	const swipe = useCallback(async (dir: string) => {
		if (dir === "right") {
			setSwipeLeft(false)
			setSwipeRight(true)
			setTimeout(() => setSwipeRight(false), 3000)
		}
		if (dir === "left") {
			setSwipeRight(false)
			setSwipeLeft(true)
			setTimeout(() => setSwipeLeft(false), 3000)
		}
	}, [])

	const onLikeAnket = useCallback(async () => {
		!mobile && swipe("right")
		dispatch(anketsPageActions.removeAnket(topStack ? topStack : ""))
		dispatch(anketsPageActions.changeTopStack())
	}, [dispatch, mobile, swipe, topStack])

	const onDislikeAnket = useCallback(async () => {
		!mobile && swipe("left")
		dispatch(anketsPageActions.removeAnket(topStack ? topStack : ""))
		dispatch(anketsPageActions.changeTopStack())
	}, [dispatch, mobile, swipe, topStack])

	// подгружать ещё анкеты если осталось штук 10
	// clearTimeout?

	if (isLoading) {
		return (
			<div className = {classNames(cls.skeletons, {}, [])}>
				<div className = {cls.header}>
					<Text
						text = {t("Категория") + t(sectionId as string)}
						theme = {TextTheme.PRIMARY}
						size = {TextSize.L}
					/>
				</div>
				<Skeleton
					className = {cls.card}
					width = {520}
					height = {400}
					border = {"10px"}
				/>
				<Skeleton
					className = {cls.card}
					width = {520}
					height = {80}
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
		<div className = {cls.wrapper}>
			<div className = {cls.header}>
				<Text
					text = {t("Категория") + t(sectionId as string)}
					theme = {TextTheme.PRIMARY}
					size = {TextSize.L}
				/>
			</div>
			<div className = {classNames(cls.cardContainer, {}, [className])}>
				{
					ankets?.length > 0 ? ankets.map((item) => {
						return (
							<AnketCard 
								key = {item.login}
								user = {item}
								className = {cls.card}
								onLikeAnket = {onLikeAnket}
								onDislikeAnket = {onDislikeAnket}
							/>
						)
					})
						: <Text text = {"Список анкет пуст :("} size = {TextSize.ML}/>
				}
				
				{
					swipeRight &&
					<Alert
						isOpen = {swipeRight}
						right = {20}
						text = {t("Лайк отправлен!")}
						theme = {AlertTheme.SUCCESS}
					/>
				}
				{
					swipeLeft &&
					<Alert
						isOpen = {swipeLeft}
						left = {105}
						text = {t("Анкета отклонена")}
						theme = {AlertTheme.ERROR}
					/>
				}
			</div>
			{ankets?.length > 0 ?
				<SwippedButtons
					viewProfile = {viewProfile}
					onLikeAnket = {onLikeAnket}
					onDislikeAnket = {onDislikeAnket}
				/> : null
			}
		</div>
	)
})