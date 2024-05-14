import { memo } from "react"
import cls from "./Notifications.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { Loader } from "shared/ui/Loader/Loader"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Form } from "shared/ui/Form/Form"
import React from "react"
import { NotificationType } from "../../model/types/types"

export interface NotificationsFormProps {
	className?: string;
	notifications: NotificationType[];
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

	if (notifications?.length === 0) {
		content = <Text text = {t("Уведомлений пока нет")} className = {cls.empty}/>
	} else {
		content = (
			<>
				{notifications?.length > 0 ? notifications?.map((item) => {
					return (
						<Text
							key = {item.notificationId}
							text = {item.message}
							className = {cls.item}
						/>
					)
				}) : null}
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

	if (error) {
		content = (<Text text = {error} theme = {TextTheme.ERROR} className = {cls.error}/>)
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