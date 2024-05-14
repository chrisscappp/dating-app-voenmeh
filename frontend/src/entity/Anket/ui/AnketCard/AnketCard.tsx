import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./AnketCard.module.scss"
import { Text, TextSize } from "shared/ui/Text/Text"
import FamilyIcon from "shared/assets/icons/family-icon.svg"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { IUser } from "entity/User"
import React, { memo, useCallback, useRef } from "react"
import TinderCard from "react-tinder-card"
import { Card } from "shared/ui/Card/Card"
import DefaultAvatar from "shared/assets/images/avatar-default.png"

interface AnketCardProps {
	className?: string;
	user?: IUser;
	onLikeAnket?: () => void;
	onDislikeAnket?: () => void;
	swiped?: boolean;
}

type Direction = "left" | "right" | "up" | "down"

export const AnketCard = memo((props: AnketCardProps) => {

	const {
		className,
		user,
		onDislikeAnket,
		onLikeAnket,
		swiped = false
	} = props

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cardRef = useRef() as any
	const { t } = useTranslation(TranslationKeys.ANKETS_PAGE)

	const swipe = useCallback((direction: Direction) => {
		if (direction === "right") {
			onLikeAnket?.()
		} else {
			onDislikeAnket?.()
		}
	}, [onDislikeAnket, onLikeAnket])

	const outOfFrame = () => {
		cardRef?.current?.restoreCard()
	}

	const cardMods: Mods = {
		[cls.grab]: swiped
	}

	if (swiped) {
		return (
			<TinderCard
				ref = {cardRef}
				className = {classNames(cls.swipe, {}, ["pressable"])}
				onSwipe = {(direction) => swipe(direction)}
				onCardLeftScreen = {() => outOfFrame()}
				preventSwipe={["up", "down"]}
			>
				<Card className = {classNames(cls.card, cardMods, [])}>
					<img
						width = {300}
						height = {320}
						style = {{
							background: `url(${user?.avatar !== null ? user?.avatar : DefaultAvatar}) center center/cover`
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
								<span title = {t("Этот аккаунт подтвержден")}>
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
	}

	return (
		<Card className = {classNames(cls.card, cardMods, [])}>
			<img
				width = {300}
				height = {320}
				style = {{
					background: `url(${user?.avatar !== null ? user?.avatar : DefaultAvatar}) center center/cover`
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
								<span title = {t("Этот аккаунт подтвержден")}>
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
	)
})