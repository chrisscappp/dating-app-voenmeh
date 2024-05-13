import { classNames } from "shared/lib/classNames/classNames"
import cls from "./LoginForm.module.scss"
import React, { useCallback, memo, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Input } from "shared/ui/Input/Input"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { 
	getLoginFormEmail,
	getLoginFormError, 
	getLoginFormIsLoading, 
	getLoginFormPassword, 
	getLoginFormUsername, 
} from "../../model/selectors/getLoginFormState"
import { loginFormActions } from "../../model/slice/loginSlice"
import { Loader } from "shared/ui/Loader/Loader"
import EyeOpenIcon from "shared/assets/icons/eye-open.svg"
import EyeClosedIcon from "shared/assets/icons/eye-closed.svg"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { loginByUsername } from "../../model/services/authByUsername/authByUsername"
import { Form } from "shared/ui/Form/Form"
import { ForgetModal } from "feautures/ForgetPassword"

export interface LoginFormProps {
	className?: string;
	onSuccess: () => void;
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {

	const { t } = useTranslation(TranslationKeys.MAIN_PAGE)
	const dispatch = useAppDispatch()
	const username = useSelector(getLoginFormUsername)
	const email = useSelector(getLoginFormEmail)
	const password = useSelector(getLoginFormPassword)
	const isLoading = useSelector(getLoginFormIsLoading)
	const error = useSelector(getLoginFormError)
	const [ isForgetMounted, setIsForgetMounted ] = useState<boolean>(false)
	const [ showEye, setShowEye ] = useState<boolean>()
	const [ isForget, setIsForget ] = useState<boolean>()

	const onMountForget = useCallback(() => {
		setIsForgetMounted(true)
	}, [])

	const onDismountForget = useCallback(() => {
		setIsForgetMounted(false)
	}, [])

	const onShowEye = useCallback(() => {
		setShowEye(!showEye)
	}, [showEye])

	const onShowForget = useCallback(() => {
		setIsForget(true)
	}, [])

	const onCloseForget = useCallback(() => {
		setIsForget(false)
	}, [])

	const onChangeUsername = useCallback((value: string) => {
		dispatch(loginFormActions.setUsername(value))
		dispatch(loginFormActions.setEmail(value))
	}, [dispatch])

	const onChangePassword = useCallback((value: string) => {
		dispatch(loginFormActions.setPassword(value))
	}, [dispatch])

	const onAuth = useCallback(async () => {
		const res = await dispatch(loginByUsername({email: email, login: username, password}))
		if (res.meta.requestStatus === "fulfilled") {
			onSuccess()
		}
	}, [dispatch, email, username, password, onSuccess])

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === "Enter") {
			onAuth()
		}
	}, [onAuth])

	useEffect(() => {
		if (!isForgetMounted) {
			window.addEventListener("keydown", onKeyDown)
		}

		return () => {
			removeEventListener("keydown", onKeyDown)
		}
	}, [isForgetMounted, onKeyDown])

	if (isLoading) {
		return <Loader/>
	}

	return (
		<>
			<Form className = {classNames(cls.LoginForm, {}, [className])}>
				<Text
					title = {t("Авторизация")}
					size = {TextSize.XL}
					className = {cls.formTitle}
				/>
				{error && <Text text = {error} theme = {TextTheme.ERROR}/>}
				<Input 
					autoFocus
					type="text" 
					className = {cls.input}
					placeholder = {t("Логин или почта")}
					value = {username}
					onChange = {onChangeUsername}
				/>
				<div className = {cls.passwordWrap}>
					<Input 
						type = {showEye ? "text" : "password"}
						className = {cls.input}
						value = {password}
						placeholder = {t("Пароль")}
						onChange = {onChangePassword}
					/>
					<span 
						className = {cls.inputIcon}
						onClick = {onShowEye}
					>
						{
							showEye 
								? 
								<EyeOpenIcon
									className = {cls.iconOpen}
								/>
								: 
								<EyeClosedIcon
									className = {cls.iconClosed}
								/> 
						}
					</span>
				</div>
				<Button
					className = {cls.forgotPass}
					theme = {ButtonTheme.CLEAR_INVERTED}
					hovered
					onClick = {onShowForget}
				>
					{t("Забыли пароль")}
				</Button>
				<Button 
					className = {cls.loginBtn}
					theme = {ButtonTheme.BACKGROUND_INVERTED}
					onClick = {onAuth}
					hovered
				>
					{t("Войти")}
				</Button>
			</Form>	
			{
				isForget &&
				<ForgetModal
					isOpen = {isForget}
					onClose = {onCloseForget}
					onMountForget = {onMountForget}
					onDismountForget = {onDismountForget}
				/>
			}
		</>
		
	)
})

export default LoginForm