import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { classNames } from "shared/lib/classNames/classNames"
import { Page } from "widgets/Page"
import cls from "./NotFoundPage.module.scss"
import { Text, TextAlign, TextSize } from "shared/ui/Text/Text"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useNavigate } from "react-router"

const NotFoundPage = () => {
	
	const { t } = useTranslation(TranslationKeys.NOT_FOUND_PAGE)
	const navigate = useNavigate()
	
	return (
		<Page className = {classNames(cls.NotFoundPage, {}, [])}>
			<Text
				text = {t("Страница не найдена")}
				size = {TextSize.L}
				align = {TextAlign.CENTER}
			/>
			<Button 
				onClick = {() => navigate("/")}
				theme = {ButtonTheme.BACKGROUND_INVERTED}
				className = {cls.btn}
			>
				{t("На главную")}
			</Button>
		</Page>
	)
}

export default memo(NotFoundPage)