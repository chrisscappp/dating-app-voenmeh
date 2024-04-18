import { memo, useCallback } from "react"
import cls from "./DeleteAccountForm.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { Input } from "shared/ui/Input/Input"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { Loader } from "shared/ui/Loader/Loader"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { userActions } from "entity/User"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Form } from "shared/ui/Form/Form"
import { getDeleteAccountForm } from "feautures/DeleteAccount/model/selectors/getDeleteAccountForm/getDeleteAccountForm"
import { getDeleteAccountError } from "feautures/DeleteAccount/model/selectors/getDeleteAccountError/getDeleteAccountError"
import { getDeleteAccountIsLoading } from "feautures/DeleteAccount/model/selectors/getDeleteAccountIsLoading/getDeleteAccountIsLoading"
import { deleteAccount } from "../../model/services/deleteAccount"
import { deleteAccountActions } from "../../model/slice/deleteAccountSlice"

export interface DeleteAccountFormProps {
	className?: string;
	onClose?: () => void;
}

const DeleteAccountForm = (props: DeleteAccountFormProps) => {

	const {
		className,
		onClose
	} = props

	const { t } = useTranslation(TranslationKeys.DELETE_ACCOUNT_FORM)
	const dispatch = useAppDispatch()
	const formData = useSelector(getDeleteAccountForm)
	const error = useSelector(getDeleteAccountError)
	const isLoading = useSelector(getDeleteAccountIsLoading)

	const onChangePassword = useCallback((value: string) => {
		dispatch(deleteAccountActions.setPassword(value))
	}, [dispatch])

	const onChangeRepeatPassword = useCallback((value: string) => {
		dispatch(deleteAccountActions.setRepeatPassword(value))
	}, [dispatch])

	const onDeleteAccount = useCallback(async () => {
		const res = await dispatch(deleteAccount())
		if (res.meta.requestStatus === "fulfilled") {
			dispatch(userActions.logout())
			onClose?.()
		}
	}, [dispatch, onClose])

	if (isLoading) {
		return <Loader/>
	}

	return (
		<Form className = {classNames(cls.DeleteAccountForm, {}, [className])}>
			<Text
				className = {cls.formTitle}
				title = {"Удаление анкеты"}
			/>
			{error && <Text text = {error} theme = {TextTheme.ERROR}/>}
			<Input
				className = {cls.input}
				placeholder = {t("Пароль")}
				onChange = {onChangePassword}
				value = {formData?.password}
			/>
			<Input
				className = {cls.input}
				placeholder = {t("повторите пароль")}
				onChange = {onChangeRepeatPassword}
				value = {formData?.repeatPassword}
			/>
			<Button
				className = {cls.btn}
				onClick = {onDeleteAccount}
				theme = {ButtonTheme.BACKGROUND_INVERTED}
			>
				{t("удалить анкету")}
			</Button>
		</Form>
	)
}

export default memo(DeleteAccountForm)