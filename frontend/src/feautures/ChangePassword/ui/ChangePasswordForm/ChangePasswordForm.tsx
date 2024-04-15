import { memo, useCallback } from "react"
import cls from "./ChangePasswordForm.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { Input } from "shared/ui/Input/Input"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { getChangePasswordForm } from "../../model/selectors/getChangePasswordForm/getChangePasswordForm"
import { useSelector } from "react-redux"
import { getChangePasswordIsLoading } from "../../model/selectors/getChangePasswordIsLoading/getChangePasswordIsLoading"
import { getChangePasswordError } from "../../model/selectors/getChangePasswordError/getChangePasswordError"
import { changePasswordActions } from "../../model/slice/changePasswordSlice"
import { Loader } from "shared/ui/Loader/Loader"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { updateUserPassword } from "../../model/services/updateUserPassword"
import { getUserAuthData } from "entity/User"
import { Form } from "shared/ui/Form/Form"

export interface ChangePasswordFormProps {
	className?: string;
	onClose?: () => void;
}

const ChangePasswordForm = (props: ChangePasswordFormProps) => {

	const {
		className,
		onClose
	} = props

	const dispatch = useAppDispatch()
	const formData = useSelector(getChangePasswordForm)
	const authData = useSelector(getUserAuthData)
	const isLoading = useSelector(getChangePasswordIsLoading)
	const error = useSelector(getChangePasswordError)

	const onChangeOldPassword = useCallback((value: string) => {
		dispatch(changePasswordActions.setOldPassword(value))
	}, [dispatch])

	const onChangeNewPassword = useCallback((value: string) => {
		dispatch(changePasswordActions.setNewPassword(value))
	}, [dispatch])

	const onSavePassword = useCallback(async () => {
		const res = await dispatch(updateUserPassword(authData ? authData.userId : ""))
		if (res.meta.requestStatus === "fulfilled") {
			onClose?.()
		}
	}, [authData, dispatch, onClose])

	if (isLoading) {
		return (
			<div className = {classNames(cls.ChangePasswordForm, {}, [className])}>
				<Loader/>
			</div>
		)
	}

	return (
		<Form className = {classNames(cls.ChangePasswordForm, {}, [className])}>
			<Text
				className = {cls.formTitle}
				title = {"Смена пароля"}
			/>
			{error && <Text theme = {TextTheme.ERROR} text = {error}/>}
			<Input
				className = {cls.input}
				placeholder = {"введите старый пароль"}
				value = {formData?.oldPassword}
				onChange = {onChangeOldPassword}
			/>
			<Input
				className = {cls.input}
				placeholder = {"введите новый пароль"}
				value = {formData?.newPassword}
				onChange = {onChangeNewPassword}
			/>
			<Button
				className = {cls.btn}
				theme = {ButtonTheme.BACKGROUND_INVERTED}
				onClick = {onSavePassword}
			>
				изменить пароль
			</Button>
		</Form>
	)
}

export default memo(ChangePasswordForm)