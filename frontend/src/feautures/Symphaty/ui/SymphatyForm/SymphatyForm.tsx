import { classNames } from "shared/lib/classNames/classNames"
import cls from "./SymphatyForm.module.scss"
import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Form } from "shared/ui/Form/Form"
import { getInteractAnketsLiked, getAnketListLiked } from "entity/Anket"
import { useSelector } from "react-redux"
import { useStore } from "react-redux"
import { StateSchema } from "app/providers/StoreProvider"
import { Text, TextSize } from "shared/ui/Text/Text"
import { SwippedButtons } from "entity/SwippedButtons"

interface SymphatyFormProps {
	className?: string;
}

const SymphatyForm = memo(({ className }: SymphatyFormProps) => {

	const { t } = useTranslation(TranslationKeys.MAIN_PAGE)
	const store = useStore<StateSchema>()
	//@ts-ignore
	let anket
	
	if (store.getState().interactAnkets) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		anket = useSelector(getInteractAnketsLiked)
	} else {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		anket = useSelector(getAnketListLiked)
	}

	return (
		<Form className = {classNames(cls.SymphatyForm, {}, [className])}>
			<img src = {anket?.avatar} alt="" />
			<div className = {cls.container}>
				<Text
					text = {t("В списке ваших друзей пополнение!")}
					size = {TextSize.ML}
				/>
				<Text
					text = {`${t("У вас взаимная симпатия с ")} ${anket?.firstname}, ${anket?.age}!`}
					size = {TextSize.ML}
					className = {cls.symphaty}
				/>
				<SwippedButtons
					mountQuestion
					mountCross = {false}
					mountTelegram
					mountVK
					viewId = {anket?.userId}
					className = {cls.btns}
				/>
			</div>
		</Form>
	)
})

export default SymphatyForm