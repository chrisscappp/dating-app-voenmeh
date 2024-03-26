import { classNames } from "shared/lib/classNames/classNames"
import cls from "./LoginForm.module.scss"
import React, { useCallback, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { loginFormReducer } from "../../model/slice/loginSlice";
import { DynamicModuleLoader } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { 
	getLoginFormError, 
	getLoginFormIsLoading, 
	getLoginFormPassword, 
	getLoginFormUsername, 
	getLoginFormValidateErrors
} from "../../model/selectors/getLoginFormState";
import { loginFormActions } from "../../model/slice/loginSlice"
import { Loader } from "shared/ui/Loader/Loader";
import EyeOpenIcon from "shared/assets/icons/eye-open.svg"
import EyeClosedIcon from "shared/assets/icons/eye-closed.svg"

export interface LoginFormProps {
	className?: string;
	onSuccess: () => void;
}

const initialReducers: ReducersList = {
	loginForm: loginFormReducer
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {

	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const username = useSelector(getLoginFormUsername)
	const password = useSelector(getLoginFormPassword)
	const isLoading = useSelector(getLoginFormIsLoading)
	const error = useSelector(getLoginFormError)
	const validateErrors = useSelector(getLoginFormValidateErrors)

	const [ showEye, setShowEye ] = useState<boolean>()

	const onShowEye = () => {
		setShowEye(!showEye)
	}

	const onChangeUsername = (value: string) => {
		dispatch(loginFormActions.setUsername(value))
	}

	const onChangePassword = (value: string) => {
		dispatch(loginFormActions.setPassword(value))
	}

	if (isLoading) {
		return <Loader/>
	}

	if (error) {
		return <Text theme = {TextTheme.PRIMARY} text = {"Произошла ошибка"}/>
	}

	return (
		<DynamicModuleLoader
			reducers = {initialReducers}
			removeAfterUnmount
		>
			<div 
				className = {classNames(cls.LoginForm, {}, [className])}
			>
				<Text
					title = {t("Авторизация")}
					size = {TextSize.XL}
					className = {cls.formTitle}
				/>
				<Input 
					autoFocus
					type="text" 
					className = {cls.input}
					placeholder = {t("Введите логин или почту")}
					value = {username}
					onChange = {onChangeUsername}
				/>
				<div className = {cls.passwordWrap}>
					<Input 
						type = {showEye ? "text" : "password"}
						className = {cls.input}
						value = {password}
						placeholder = {t("Введите пароль")}
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
					{t("забыли пароль?")}
				</Button>
				<Button 
					className = {cls.loginBtn}
					theme = {ButtonTheme.BACKGROUND_INVERTED}
					hovered
				>
					{t("Войти")}
				</Button>
				
				
			</div>
		</DynamicModuleLoader>
			
	)
})

export default LoginForm