import { memo, useCallback } from "react"
import cls from "./WrongAnketForm.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { Loader } from "shared/ui/Loader/Loader"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Form } from "shared/ui/Form/Form"
import React from "react"
import { getWrongAnketIsLoading } from "../../model/selectors/getWrongAnketIsLoading/getWrongAnketIsLoading"
import { useSelector } from "react-redux"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { getWrongAnketError } from "../../model/selectors/getWrongAnketError/getWrongAnketError"
import { getWrongAnketMessage } from "../../model/selectors/getWrongAnketMessage/getWrongAnketMessage"
import { TextArea } from "shared/ui/TextArea/TextArea"
import { wrongAnketActions } from "../../model/slice/wrongAnketSlice"
import { sendWrong } from "../../model/services/sendWrong"

export interface WrongAnketFormProps {
	className?: string;
	wrongId?: string;
	onDislikeAnket?: () => void;
	onClose?: () => void;
}

const WrongAnketForm = (props: WrongAnketFormProps) => {

	const {
		className,
		wrongId,
		onDislikeAnket,
		onClose
	} = props

	const { t } = useTranslation(TranslationKeys.WRONG_ANKET_MODAL)
	const dispatch = useAppDispatch()
	const isLoading = useSelector(getWrongAnketIsLoading)
	const error = useSelector(getWrongAnketError)
	const message = useSelector(getWrongAnketMessage)

	const onChangeMessage = useCallback((value: string) => {
		dispatch(wrongAnketActions.setMessage(value))
	}, [dispatch])

	const onSendWrong = useCallback(async () => {
		// const response = await dispatch(sendWrong(wrongId ? wrongId : ""))
		// if (response.meta.requestStatus === "fulfilled") {
		// 	alert("Жалоба отправлена в рассмотрение!")
		// }
		alert("Жалоба отправлена в рассмотрение!")
		onDislikeAnket?.()
		onClose?.()
	}, [onClose, onDislikeAnket])

	if (isLoading) {
		return <Loader/>
	}

	return (
		<Form className = {classNames(cls.WrongAnketForm, {}, [className])}>
			<Text
				className = {cls.formTitle}
				title = {t("Жалоба на анкету")}
			/>
			{error && <Text text = {error} theme = {TextTheme.ERROR}/>}
			<TextArea
				autoFocus
				value = {message}
				onChange = {onChangeMessage}
				placeholder = {t("Почему вы решили пожаловаться на анкету?")}
				height = {100}
				className = {cls.area}
			/>
			<Button
				theme = {ButtonTheme.BACKGROUND_INVERTED}
				className = {cls.btn}
				onClick = {onSendWrong}
			>
				{t("пожаловаться")}
			</Button>
		</Form>
	)
}

export default memo(WrongAnketForm)