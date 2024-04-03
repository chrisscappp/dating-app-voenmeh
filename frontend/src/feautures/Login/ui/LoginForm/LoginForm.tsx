import { classNames } from "shared/lib/classNames/classNames"
import cls from "./LoginForm.module.scss"
import React, { useCallback, memo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Input } from "shared/ui/Input/Input"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { loginFormReducer } from "../../model/slice/loginSlice"
import { DynamicModuleLoader } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { 
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
import { loginByUsername } from "../../model/services/authByUsername"

export interface LoginFormProps {
	className?: string;
	onSuccess: () => void;
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {

	const { t } = useTranslation(TranslationKeys.MAIN_PAGE)
	const dispatch = useAppDispatch()
	const username = useSelector(getLoginFormUsername)
	const password = useSelector(getLoginFormPassword)
	const isLoading = useSelector(getLoginFormIsLoading)
	const error = useSelector(getLoginFormError)

	const [ showEye, setShowEye ] = useState<boolean>()

	const onShowEye = useCallback(() => {
		setShowEye(!showEye)
	}, [showEye])

	const onChangeUsername = useCallback((value: string) => {
		dispatch(loginFormActions.setUsername(value))
	}, [dispatch])

	const onChangePassword = useCallback((value: string) => {
		dispatch(loginFormActions.setPassword(value))
	}, [dispatch])

	const onAuth = useCallback(async () => {
		const res = await dispatch(loginByUsername({email: "", login: username, password}))
		if (res.meta.requestStatus === "fulfilled") {
			onSuccess()
		}
	}, [dispatch, password, username, onSuccess])

	if (isLoading) {
		return <Loader/>
	}

	return (
		<div 
			className = {classNames(cls.LoginForm, {}, [className])}
		>
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
		</div>	
	)
})

export default LoginForm