import { classNames } from "shared/lib/classNames/classNames"
import cls from "./RegisterForm.module.scss"
import React, { memo, useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { registerFormActions } from "../../model/slice/registerSlice"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Input } from "shared/ui/Input/Input"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { SelectSex, Sex } from "entity/SelectSex"
import { getRegisterFormBirthday, getRegisterFormCheckBoxFlag, getRegisterFormEmail, getRegisterFormError, getRegisterFormFirstname, getRegisterFormIsLoading, getRegisterFormLastname, getRegisterFormPassword, getRegisterFormRepeatPassword, getRegisterFormSex, getRegisterFormLogin, getRegisterFormValidateErrors } from "feautures/Register/model/selectors/getRegisterState"
import { Loader } from "shared/ui/Loader/Loader"
import { CheckBox } from "shared/ui/CheckBox/CheckBox"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { registerByUsername } from "../../model/services/registerByUsername"
import { FormErrorType } from "../../model/types/errors"
import { Form } from "shared/ui/Form/Form"

interface RegisterFormProps {
	className?: string;
	onSuccess: () => void;
}

const RegisterForm = memo(({ className, onSuccess }: RegisterFormProps) => {

	const { t } = useTranslation(TranslationKeys.MAIN_PAGE)
	const dispatch = useAppDispatch()
	const firstname = useSelector(getRegisterFormFirstname)
	const lastname = useSelector(getRegisterFormLastname)
	const login = useSelector(getRegisterFormLogin)
	const email = useSelector(getRegisterFormEmail)
	const birthday = useSelector(getRegisterFormBirthday)
	const sex = useSelector(getRegisterFormSex)
	const password = useSelector(getRegisterFormPassword)
	const repeatPassword = useSelector(getRegisterFormRepeatPassword)
	const error = useSelector(getRegisterFormError)
	const isLoading = useSelector(getRegisterFormIsLoading)
	const validateErrors = useSelector(getRegisterFormValidateErrors)
	const checkBoxFlag = useSelector(getRegisterFormCheckBoxFlag)

	const validateTranslate: Record<FormErrorType, string> = {
		[FormErrorType.EMPTY_FORM]: t("Поля формы пусты"),
		[FormErrorType.INCORRECT_BIRTHDAY]: t("Некорректная дата рождения"),
		[FormErrorType.INCORRECT_EMAIL]: t("Некорректная почта"),
		[FormErrorType.INVALID_DATA]: t("Все поля формы должны быть заполнены"),
		[FormErrorType.REPEAT_PASSWORD]: t("Пароли не совпадают"),
		[FormErrorType.SERVER_ERROR]: t("Ошибка сервера"),
		[FormErrorType.TURN_CHECKBOX]: t("Нет согласия на обработку персональных данных"),
		[FormErrorType.LOGIN_ALREADY]: t("Логин используется"),
		[FormErrorType.EMAIL_ALREADY]: t("Почта используется"),
		[FormErrorType.PASSWORD_INVALID]: t("Пипин короткий")
	}

	const onChangeFirstname = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ firstname: value || "" }))
	}, [dispatch])

	const onChangeLastname = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ lastname: value || "" }))
	}, [dispatch])

	const onChangeLogin = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ login: value || "" }))
	}, [dispatch])

	const onChangeEmail = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ email: value || "" }))
	}, [dispatch])

	const onChangeBirthday = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ birthday: value || "" }))
	}, [dispatch])

	const onChangePassword = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ password: value || "" }))
	}, [dispatch])

	const onChangeRepeatPassword = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ repeatPassword: value || "" }))
	}, [dispatch])

	const onChangeSex = useCallback((value: string) => {
		dispatch(registerFormActions.setRegisterFormField({ sex: value as Sex }))
	}, [dispatch])

	const onSwitchCheckbox = useCallback(() => {
		dispatch(registerFormActions.setRegisterFormField({ checkBoxFlag: !checkBoxFlag }))
	}, [checkBoxFlag, dispatch])	

	const onRegister = useCallback(async () => {
		const res = await dispatch(registerByUsername())
		if (res.meta.requestStatus === "fulfilled") {
			onSuccess()
		}
	}, [dispatch, onSuccess])

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === "Enter") {
			onRegister()
		}
	}, [onRegister])

	useEffect(() => {
		window.addEventListener("keydown", onKeyDown)

		return () => {
			removeEventListener("keydown", onKeyDown)
		}
	}, [onKeyDown])


	if (isLoading) {
		return <Loader/>
	}

	return (
		<Form className = {classNames(cls.RegisterForm, {}, [className])}>
			<Text
				title = {t("Регистрация")}
				size = {TextSize.XL}
				className = {cls.formTitle}
			/>
			<Input 
				autoFocus
				type="text" 
				className = {cls.input}
				placeholder = {t("имя")}
				onChange = {onChangeFirstname}
				value = {firstname}
			/>
			<Input 
				type="text" 
				className = {cls.input}
				placeholder = {t("фамилия")}
				onChange = {onChangeLastname}
				value = {lastname}
			/>
			<Input 
				type="text" 
				className = {cls.input}
				placeholder = {t("логин")}
				onChange = {onChangeLogin}
				value = {login}
			/>
			<Input 
				type="text" 
				className = {cls.input}
				placeholder = {t("почта")}
				onChange = {onChangeEmail}
				value = {email}
			/>
			<Input 
				type="text" 
				className = {cls.input}
				placeholder = {t("дата рождения")}
				onChange = {onChangeBirthday}
				value = {birthday}
			/>
			<SelectSex
				onChange = {onChangeSex}
				value = {sex}
				label = {t("укажите пол")}
			/>
			<Input 
				type="text" 
				className = {cls.input}
				placeholder = {t("Пароль")}
				onChange = {onChangePassword}
				value = {password}
			/>
			<Input 
				type="text" 
				className = {cls.input}
				placeholder = {t("повторите пароль")}
				onChange = {onChangeRepeatPassword}
				value = {repeatPassword}
			/>
			{validateErrors && 
			<Text
				text = {validateTranslate[validateErrors[0]]}
				theme = {TextTheme.ERROR}	
				className = {cls.error}
			/>
			}
			{error && (<Text text = {t(error)} theme = {TextTheme.ERROR} className = {cls.error}/>)}
			<div className = {cls.checkboxWrap}>
				<CheckBox
					className = {cls.checkbox}
					value = {checkBoxFlag}
					onChange = {onSwitchCheckbox}
				/>
				<Text
					text = {t("согласие на обработку персональных данных")}
					className = {cls.personalText}
				/>
			</div>
			<Button 
				className = {cls.registerBtn}
				theme = {ButtonTheme.BACKGROUND_INVERTED}
				onClick = {onRegister}
				hovered
			>
				{t("поехали")}
			</Button>
		</Form>
	)
})

export default RegisterForm