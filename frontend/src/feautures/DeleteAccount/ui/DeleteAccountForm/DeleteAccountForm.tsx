import { memo, useCallback } from "react"
import cls from "./DeleteAccountForm.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { Input } from "shared/ui/Input/Input"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { Loader } from "shared/ui/Loader/Loader"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { getUserAuthData } from "entity/User"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Form } from "shared/ui/Form/Form"

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

	return (
		<Form className = {classNames(cls.DeleteAccountForm, {}, [className])}>
			<Text
				className = {cls.formTitle}
				title = {"Удаление анкеты"}
			/>
			<Input
				className = {cls.input}
				placeholder = {t("Пароль")}
			/>
			<Input
				className = {cls.input}
				placeholder = {t("повторите пароль")}
			/>
			<Button
				className = {cls.btn}
				onClick = {onClose}
				theme = {ButtonTheme.BACKGROUND_INVERTED}
			>
				{t("удалить анкету")}
			</Button>
		</Form>
	)
}

export default memo(DeleteAccountForm)