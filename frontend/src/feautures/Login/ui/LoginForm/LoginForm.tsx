import { classNames } from "shared/lib/classNames/classNames"
import cls from "./LoginForm.module.scss"
import React, { useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text"
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
	const validateErros = useSelector(getLoginFormValidateErrors)

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
					title = {t("Форма авторизации")}
					className = {cls.formTitle}
				/>
				<Input 
					autoFocus
					type="text" 
					className = {cls.input}
					placeholder = {t("Введите username")}
					value = {username}
					onChange = {onChangeUsername}
				/>
				<Input 
					type="text"
					className = {cls.input}
					value = {password}
					placeholder = {t("Введите пароль")}
					onChange = {onChangePassword}
				/>
				<Button 
					className = {cls.loginBtn}
					theme = {ButtonTheme.OUTLINE_INVERTED}
					hovered
				>
					{t("Войти")}
				</Button>
			</div>
		</DynamicModuleLoader>
			
	)
})

export default LoginForm