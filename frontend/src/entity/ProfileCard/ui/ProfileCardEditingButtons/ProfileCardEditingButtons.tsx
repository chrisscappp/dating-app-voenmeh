import { Button, ButtonTheme } from "shared/ui/Button/Button"
import cls from "./ProfileCardEditingButtons.module.scss"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { ChangePasswordModal } from "feautures/ChangePassword" // !нарушена архитектура
import React, { Dispatch, memo, SetStateAction, useCallback, useState } from "react"
import { Portal } from "shared/ui/Portal/Portal"

interface ProfileCardEditingButtonsProps {
	readonly?: boolean;
	onChangeReadonly?: () => void;
	onCancelEdit?: () => void;
	onEditProfile?: () => void;
	setIsOpenSuccess?: Dispatch<SetStateAction<boolean>>;
	setIsOpenError?: Dispatch<SetStateAction<boolean>>;
}

export const ProfileCardEditingButtons = memo((props: ProfileCardEditingButtonsProps) => {
	
	const {
		onCancelEdit,
		readonly,
		onChangeReadonly,
		onEditProfile,
		setIsOpenError,
		setIsOpenSuccess
	} = props

	const { t } = useTranslation(TranslationKeys.PROFILE_PAGE)
	const [ isOpen, setIsOpen ] = useState<boolean>(false)

	const onCloseModal = useCallback(() => {
		setIsOpen(false)
	}, [])

	const onOpenModal = useCallback(() => {
		setIsOpen(true)
	}, [])

	const onOpenSuccessAlert = useCallback(() => {
		setIsOpenSuccess?.(true)
		setTimeout(() => setIsOpenSuccess?.(false), 5000)
	}, [setIsOpenSuccess])

	const onOpenErrorAlert = useCallback(() => {
		setIsOpenError?.(true)
		setTimeout(() => setIsOpenError?.(false), 5000)
	}, [setIsOpenError])

	return (
		<>
			{
				readonly ? 
					<>
						<Button 
							theme = {ButtonTheme.BACKGROUND_INVERTED}
							className = {cls.editBtn}
							onClick = {onChangeReadonly}
						>
							{t("редактировать")}
						</Button>
						<Button 
							theme = {ButtonTheme.BACKGROUND_INVERTED}
							className = {cls.editBtn}
							onClick = {onOpenModal}
						>
							{t("изменить пароль")}
						</Button>
					</>
					:
					<>
						<Button 
							theme = {ButtonTheme.ERROR}
							className = {cls.editBtn}
							onClick = {onCancelEdit}
						>
							{t("отменить изменения")}
						</Button>
						<Button 
							theme = {ButtonTheme.ACCESS}
							className = {cls.editBtn}
							onClick = {onEditProfile}
						>
							{t("подтвердить изменения")}
						</Button>
					</>
			}
			{isOpen && 
			<Portal>
				<ChangePasswordModal
					isOpen = {isOpen}
					onClose = {onCloseModal}
					onOpenSuccessAlert = {onOpenSuccessAlert}
					onOpenErrorAlert = {onOpenErrorAlert}
				/>
			</Portal>}
		</>
	)
})