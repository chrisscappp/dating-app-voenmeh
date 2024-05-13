import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ForgetForm.module.scss"
import React, { useCallback, memo, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Input } from "shared/ui/Input/Input"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { Loader } from "shared/ui/Loader/Loader"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Form } from "shared/ui/Form/Form"
import { getForgetEmail } from "../../modal/selectors/getForgetEmail/getForgetEmail"
import { getForgetError } from "../../modal/selectors/getForgetError/getForgetError"
import { getForgetIsLoading } from "../../modal/selectors/getForgetIsLoading/getForgetIsLoading"
import { getForgetMessage } from "../../modal/selectors/getForgetMessage/getForgetMessage"
import { forgetPasswordActions } from "../../modal/slice/forgetPasswordSlice"
import { forgetPassword } from "../../modal/services/forgetPassword/forgetPassword"

export interface ForgetFormProps {
	className?: string;
	onMountForget: () => void;
	onDismountForget: () => void;
}

const ForgetForm = memo(({ className, onDismountForget, onMountForget }: ForgetFormProps) => {

	const { t } = useTranslation(TranslationKeys.MAIN_PAGE)
	const dispatch = useAppDispatch()
	const email = useSelector(getForgetEmail)
	const error = useSelector(getForgetError)
	const isLoading = useSelector(getForgetIsLoading)
	const message = useSelector(getForgetMessage)

	useEffect(() => {
		onMountForget()
		
		return () => {
			onDismountForget()
		}
	}, [onDismountForget, onMountForget])

	const onChangeEmail = useCallback((value: string) => {
		dispatch(forgetPasswordActions.setEmail(value))
	}, [dispatch])

	const onForget = useCallback(async () => {
		const res = await dispatch(forgetPassword({
			email: email,
			login: "",
			password: ""
		}))
		
		if (res.meta.requestStatus === "fulfilled") {
			onChangeEmail("")
		}
	}, [dispatch, email, onChangeEmail])

	if (isLoading) {
		return <Loader/>
	}

	return (
		<Form className = {classNames(cls.LoginForm, {}, [className])}>
			<Text
				title = {t("Восстановление пароля")}
				size = {TextSize.XL}
				className = {cls.formTitle}
			/>
			{error && <Text text = {t(error)} theme = {TextTheme.ERROR}/>}
			{message && <Text text = {t(message)} theme = {TextTheme.SUCCESS}/>}
			<Input 
				autoFocus
				type="text" 
				className = {cls.input}
				placeholder = {t("Введите вашу почту")}
				value = {email}
				onChange = {onChangeEmail}
			/>
			<Button
				className = {cls.forgotPass}
				theme = {ButtonTheme.BACKGROUND_INVERTED}
				hovered
				onClick = {onForget}
			>
				{t("Получить пароль")}
			</Button>
		</Form>	
	)
})

export default ForgetForm