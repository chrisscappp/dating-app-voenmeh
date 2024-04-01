import { classNames } from "shared/lib/classNames/classNames"
import cls from "./RegisterForm.module.scss"
import React, { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { DynamicModuleLoader } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { registerFormReducer, registerFormActions } from "../../model/slice/registerSlice";
import { Text, TextSize } from "shared/ui/Text/Text";
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { SelectSex, Sex } from "entities/SelectSex";
import { getRegisterFormBirthday, getRegisterFormCheckBoxFlag, getRegisterFormEmail, getRegisterFormError, getRegisterFormFirstname, getRegisterFormIsLoading, getRegisterFormLastname, getRegisterFormPassword, getRegisterFormRepeatPassword, getRegisterFormSex, getRegisterFormUsername, getRegisterFormValidateErrors } from "feautures/Register/model/selectors/getRegisterState";
import { Loader } from "shared/ui/Loader/Loader";
import { CheckBox } from "shared/ui/CheckBox/CheckBox";
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys";

interface RegisterFormProps {
	className?: string;
	onSuccess: () => void;
}

const initialReducers: ReducersList = {
	registerForm: registerFormReducer
}

const RegisterForm = memo(({ className, onSuccess }: RegisterFormProps) => {

	const { t } = useTranslation(TranslationKeys.MAIN_PAGE)
	const dispatch = useAppDispatch()
	const firstname = useSelector(getRegisterFormFirstname)
	const lastname = useSelector(getRegisterFormLastname)
	const username = useSelector(getRegisterFormUsername)
	const email = useSelector(getRegisterFormEmail)
	const birthday = useSelector(getRegisterFormBirthday)
	const sex = useSelector(getRegisterFormSex)
	const password = useSelector(getRegisterFormPassword)
	const repeatPassword = useSelector(getRegisterFormRepeatPassword)
	const error = useSelector(getRegisterFormError)
	const isLoading = useSelector(getRegisterFormIsLoading)
	const validateErrors = useSelector(getRegisterFormValidateErrors)
	const checkBoxFlag = useSelector(getRegisterFormCheckBoxFlag)

	const onChangeFirstname = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ firstname: value || "" }))
	}, [])

	const onChangeLastname = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ lastname: value || "" }))
	}, [])

	const onChangeUsername = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ username: value || "" }))
	}, [])

	const onChangeEmail = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ email: value || "" }))
	}, [])

	const onChangeBirthday = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ birthday: value || "" }))
	}, [])

	const onChangePassword = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ password: value || "" }))
	}, [])

	const onChangeRepeatPassword = useCallback((value?: string) => {
		dispatch(registerFormActions.setRegisterFormField({ repeatPassword: value || "" }))
	}, [])

	const onChangeSex = useCallback((value: string) => {
		dispatch(registerFormActions.setRegisterFormField({ sex: value as Sex }))
	}, [])

	if (error) {
		return <h3>{error}</h3>
	}

	if (isLoading) {
		return <Loader/>
	}

	return (
		<DynamicModuleLoader
			reducers = {initialReducers}
			removeAfterUnmount
		>
			<div 
				className = {classNames(cls.RegisterForm, {}, [className])}
			>
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
					placeholder = {t("Логин или почта")}
					onChange = {onChangeUsername}
					value = {username}
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
				<div className = {cls.checkboxWrap}>
					<CheckBox
						className = {cls.checkbox}
					/>
					<Text
						text = {t("согласие на обработку персональных данных")}
						className = {cls.personalText}
					/>
				</div>
				
				<Button 
					className = {cls.registerBtn}
					theme = {ButtonTheme.BACKGROUND_INVERTED}
					hovered
				>
					{t("зарегестрироваться")}
				</Button>
			</div>
		</DynamicModuleLoader>
	)
})

export default RegisterForm