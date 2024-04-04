import { classNames } from "shared/lib/classNames/classNames"
import cls from "./MainPageInfo.module.scss"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { useMemo } from "react"
import { ConfigType } from "shared/config/mainPageInfoConfig/mainPageInfoConfig"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import React, { useState, useCallback } from "react"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { RegisterModal } from "feautures/Register"
import { useSelector } from "react-redux"
import { getUserAuthData } from "entities/User"
import { useNavigate } from "react-router"

interface MainPageInfoProps {
	className?: string;
	infoObject: ConfigType
}

export const MainPageInfo = ({ className, infoObject }: MainPageInfoProps) => {

	const { t } = useTranslation(TranslationKeys.MAIN_PAGE)

	const [ isOpenModal, setIsOpenModal ] = useState<boolean>(false)
	const authData = useSelector(getUserAuthData)
	const navigate = useNavigate()

	const onNavigate = useCallback(() => {
		navigate("/ankets")
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}, [navigate])

	const openModal = useCallback(() => {
		setIsOpenModal(true)
	}, [])

	const closeModal = useCallback(() => {
		setIsOpenModal(false)
	}, [])

	const mainPageinfo = useMemo(() => {
		return Object.values(infoObject).map(item => {
			return (
				<div 
					className = {cls.infoWrapper}
					key = {item.text}
				>
					<div className = {cls.content}>
						<div className = {cls.contentImage}>
							<img
								src = {item.imgUrl}
								className = {cls.image}
							/>
						</div>
						<div className = {cls.contentText}>
							<div className = {cls.titleWrap}>
								<Text
									subTitle = {t(item.subTitle)}
									className = {cls.title}
									theme = {TextTheme.PRIMARY}
									size = {TextSize.L}
								/>
							</div>
							<Text
								text = {t(item.text)}
								className = {cls.description}
								theme = {TextTheme.PRIMARY}
								size = {TextSize.ML}
							/>
							<Text
								text = {t(item.subText)}
								className = {cls.subDescription}
								theme = {TextTheme.PRIMARY}
								size = {TextSize.ML}
							/>
							{item.buttonsText &&
								<>
									<div className = {cls.btnsBlock}>
										<Button
											className = {cls.getStartedBtn}
											theme = {ButtonTheme.BACKGROUND_INVERTED}
											hovered
											onClick = {authData ? onNavigate : openModal}
										>
											{t(item.buttonsText[0])}
										</Button>
										<Button
											className = {cls.learnMoreBtn}
											theme = {ButtonTheme.BACKGROUND_INVERTED}
											hovered
										>
											{t(item.buttonsText[1])}
										</Button>
									</div>
								</>
							}		
						</div>
					</div>
				</div>
			)
		})
	}, [authData, infoObject, onNavigate, openModal, t])

	return (
		<div className = {classNames(cls.MainPageInfo, {}, [className])}>
			{mainPageinfo}
			{
				isOpenModal &&
			<RegisterModal
				isOpen = {isOpenModal}
				onClose = {closeModal}
			/>
			}
		</div>
	)
}