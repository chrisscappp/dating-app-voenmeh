import { Button, ButtonTheme } from "shared/ui/Button/Button"
import cls from "./ProfileCardEditingButtons.module.scss"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { ChangePasswordModal } from "feautures/ChangePassword" // !нарушена архитектура
import { useCallback, useState } from "react"
import { Portal } from "shared/ui/Portal/Portal"

interface ProfileCardEditingButtonsProps {
	readonly?: boolean;
	onChangeReadonly?: () => void;
	onCancelEdit?: () => void;
	onEditProfile?: () => void;
}

export const ProfileCardEditingButtons = (props: ProfileCardEditingButtonsProps) => {
	
	const {
		onCancelEdit,
		readonly,
		onChangeReadonly,
		onEditProfile
	} = props

	const { t } = useTranslation(TranslationKeys.PROFILE_PAGE)
	const [ isOpen, setIsOpen ] = useState<boolean>(false)

	const onCloseModal = useCallback(() => {
		setIsOpen(false)
	}, [])

	const onOpenModal = useCallback(() => {
		setIsOpen(true)
	}, [])

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
				/>
			</Portal>}
			
		</>
	)
}