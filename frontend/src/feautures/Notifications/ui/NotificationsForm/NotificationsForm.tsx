import { memo, useCallback, useEffect } from "react"
import cls from "./Notifications.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { Input } from "shared/ui/Input/Input"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { Loader } from "shared/ui/Loader/Loader"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { getUserAuthData } from "entity/User"
import { fetchNotifications } from "../../model/services/fetchNotifications/fetchNotifications"
import { removeNotifications } from "../../model/services/removeNotifications/removeNotifications"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Form } from "shared/ui/Form/Form"

export interface NotificationsFormProps {
	className?: string;
	notifications: string[];
	error: string;
	isLoading: boolean;
	removeNotifications: () => void;
}

const NotificationsForm = (props: NotificationsFormProps) => {

	const {
		className,
		error,
		isLoading,
		notifications,
		removeNotifications
	} = props

	const { t } = useTranslation(TranslationKeys.NOTIFICATIONS_MODAL)
	
	let content

	if (isLoading) {
		return <Loader/>
	}

	if (error) {
		content = <Text text = {t(error)} theme = {TextTheme.ERROR}/>
	}

	if (notifications?.length === 0) {
		content = <Text text = {t("Уведомлений нет")} className = {cls.empty}/>
	} else {
		content = (
			<>
				{notifications?.map(item => {
					return (
						<Text
							key = {item}
							text = {item}
							className = {cls.item}
						/>
					)
				})}
				<Button
					className = {cls.btn}
					onClick = {removeNotifications}
					theme = {ButtonTheme.BACKGROUND_INVERTED}
				>
					{t("прочитано")}
				</Button>
			</>
		)
	}

	return (
		<Form className = {classNames(cls.DeleteAccountForm, {}, [className])}>
			<Text
				className = {cls.formTitle}
				title = {t("Уведомления")}
			/>
			{content}
		</Form>
	)
}

export default memo(NotificationsForm)