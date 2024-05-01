import { classNames } from "shared/lib/classNames/classNames"
import cls from "./InteractAnketCardList.module.scss"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { getInteractAnketsIsLoading } from "../../model/selectors/getInteractAnketsIsLoading/getInteractAnketsIsLoading"
import { getInteractAnketsError } from "../../model/selectors/getInteractAnketsError/getInteractAnketsError"
import { memo, useState } from "react"
import { fetchAnkets } from "../../model/services/fetchAnkets/fetchAnkets"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import { isSectionId } from "shared/lib/typeGuards/isSectionId"
import { getInteractAnketsList } from "../../model/slice/interactAnketsSlice/interactAnketsSlice"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Alert, AlertTheme } from "shared/ui/Alert/Alert"
import { getInteractAnketsTopStack } from "../../model/selectors/getInteractAnketsTopStack/getInteractAnketsTopStack"
import { InteractAnketCard } from "feautures/InteractAnketCard" // нарушение FSD
import { EmptyAnkets } from "../EmptyAnkets/EmptyAnkets"

interface AnketCardProps {
	className?: string;
	sectionId?: string; 
}

export const InteractAnketCardList = memo((props: AnketCardProps) => {

	const {
		className,
		sectionId
	} = props

	const { t } = useTranslation(TranslationKeys.ANKETS_PAGE)
	const dispatch = useAppDispatch()
	const ankets = useSelector(getInteractAnketsList.selectAll)
	const isLoading = useSelector(getInteractAnketsIsLoading)
	const error = useSelector(getInteractAnketsError)
	const topStack = useSelector(getInteractAnketsTopStack)
	const [swipeRight, setSwipeRight] = useState<boolean>(false)
	const [swipeLeft, setSwipeLeft] = useState<boolean>(false)

	useInitialEffect(() => {
		if (isSectionId(sectionId)) {
			dispatch(fetchAnkets(sectionId))
		}
	})

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
			<div className = {classNames(cls.InteractAnketCardList, {}, [className])}>
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
		<>
			<div className = {cls.header}>
				<Text
					text = {t("Категория") + t(sectionId as string)}
					theme = {TextTheme.PRIMARY}
					size = {TextSize.L}
				/>
			</div>
			<div className = {cls.cardWrap}>
				{
					ankets?.length > 0 ? ankets.map((item) => {
						return (
							<InteractAnketCard 
								key = {item.login}
								user = {item}
								className = {cls.card}
								setSwipeLeft = {setSwipeLeft}
								setSwipeRight = {setSwipeRight}
								topStack = {topStack}
							/>
						)
					})
						: <EmptyAnkets/>
				}
				{
					swipeRight &&
					<Alert
						isOpen = {swipeRight}
						right = {20}
						bottom = {60}
						text = {t("Лайк отправлен!")}
						theme = {AlertTheme.SUCCESS}
					/>
				}
				{
					swipeLeft &&
					<Alert
						isOpen = {swipeLeft}
						left = {105}
						bottom = {60}
						text = {t("Анкета отклонена")}
						theme = {AlertTheme.ERROR}
					/>
				}
			</div>
		</>
	)
})