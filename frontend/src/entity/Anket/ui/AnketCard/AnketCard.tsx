import { classNames } from "shared/lib/classNames/classNames"
import cls from "./AnketCard.module.scss"
import { Text, TextSize } from "shared/ui/Text/Text"
import FamilyIcon from "shared/assets/icons/family-icon.svg"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { IUser } from "entity/User"
import { memo, useCallback } from "react"
import TinderCard from "react-tinder-card"
import { Card } from "shared/ui/Card/Card"
import { SwippedButtons } from "entity/SwippedButtons"
import { useNavigate } from "react-router"

interface AnketCardProps {
	className?: string;
	user?: IUser;
	onLikeAnket?: () => void;
	onDislikeAnket?: () => void;
}

type Direction = "left" | "right" | "up" | "down"

export const AnketCard = memo((props: AnketCardProps) => {

	const {
		className,
		user,
		onDislikeAnket,
		onLikeAnket
	} = props

	const { t } = useTranslation(TranslationKeys.ANKETS_PAGE)

	const swiped = useCallback((direction: Direction) => {
		if (direction === "right") {
			onLikeAnket?.()
		} else {
			onDislikeAnket?.()
		}
	}, [onDislikeAnket, onLikeAnket])

	return (
		<TinderCard
			className = {classNames(cls.swipe, {}, ["pressable"])}
			onSwipe = {(direction) => swiped(direction)}
			preventSwipe={["up", "down"]}
		>
			<Card className = {classNames(cls.card, {}, [])}>
				<img
					width = {300}
					height = {320}
					style = {{
						background: `url(${user?.avatar}) center center/cover`
					}}
					className = {cls.img}
					aria-disabled
				/>
				<div className = {cls.body}>
					<div className = {cls.infoWrap}>
						<div className = {cls.infoContainer}>
							<div className = {cls.name}>
								<Text
									text = {`${user?.firstname}, ${user?.age}`}
									size = {TextSize.ML}
								/>
								{user?.confirm && 
							<span title = {t("Профиль подтвержден")}>
								<FamilyIcon className = {cls.icon}/>
							</span>
								}
							</div>
							<Text
								className = {cls.about}
								text = {user?.about}
								size = {TextSize.ML}
							/>
						</div>
					</div>
				</div>
			</Card>
		</TinderCard>
	)
})