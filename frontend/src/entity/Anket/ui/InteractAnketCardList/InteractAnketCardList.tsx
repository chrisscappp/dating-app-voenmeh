import { classNames } from "shared/lib/classNames/classNames"
import cls from "./InteractAnketCardList.module.scss"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { getAnketsPageIsLoading } from "../../model/selectors/getAnketsPageIsLoading/getAnketsPageIsLoading"
import { getAnketsPageError } from "../../model/selectors/getAnketsPageError/getAnketsPageError"
import { memo, useState } from "react"
import { fetchAnketsBySection } from "../../model/services/fetchAnketsBySection/fetchAnketsBySection"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import { isSectionId } from "shared/lib/typeGuards/isSectionId"
import { getAnketsList } from "../../model/slice/anketsSlice/anketsSlice"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Alert, AlertTheme } from "shared/ui/Alert/Alert"
import { getAnketsPageTopStack } from "../../model/selectors/getAnketsPageTopStack/getAnketsPageTopStack"
import { InteractAnketCard } from "feautures/InteractAnketCard" // нарушение FSD
import { Button, ButtonTheme } from "shared/ui/Button/Button"
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
	const navigate = useNavigate()
	const [swipeRight, setSwipeRight] = useState<boolean>(false)
	const [swipeLeft, setSwipeLeft] = useState<boolean>(false)

	useInitialEffect(() => {
		if (isSectionId(sectionId)) {
			dispatch(fetchAnketsBySection(sectionId))
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
						: (
							<div className = {cls.emptyList}>
								<Text 
									text = {"Список анкет пуст :("} 
									size = {TextSize.ML}
									className = {cls.emptyText}
								/>
								<Button
									theme = {ButtonTheme.BACKGROUND_INVERTED}
									className = {cls.emptyBtn}
									onClick = {() => navigate("/ankets")}
								>
									{t("к разделам")}
								</Button>
							</div>
						)
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