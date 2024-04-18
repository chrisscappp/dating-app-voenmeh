import { Button, ButtonTheme } from "shared/ui/Button/Button"
import cls from "./ProfileCardFooterButtons.module.scss"
import { useNavigate } from "react-router"
import { IUser } from "entity/User"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { DeleteAccountModal } from "feautures/DeleteAccount" //! нарушение архитектуры
import { Portal } from "shared/ui/Portal/Portal"
import { useCallback, useState } from "react"

interface ProfileCardFooterButtonsProps {
	isAuthUser?: boolean;
	authData?: IUser
	userId?: string
	readonly?: boolean
	onCancelEdit?: () => void;
	onEditProfile?: () => void;
}

export const ProfileCardFooterButtons = (props: ProfileCardFooterButtonsProps) => {
	
	const {
		isAuthUser,
		readonly,
		onCancelEdit,
		onEditProfile
	} = props

	const navigate = useNavigate()
	const { t } = useTranslation(TranslationKeys.PROFILE_PAGE)
	const [ isOpen, setIsOpen ] = useState<boolean>(false)

	const onOpenModal = useCallback(() => {
		setIsOpen(true)
	}, [])

	const onCloseModal = useCallback(() => {
		setIsOpen(false)
	}, [])

	const toAnkets = () => {
		navigate("/ankets")
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	if (!readonly) {
		return (
			<>
				<Button 
					theme = {ButtonTheme.ACCESS}
					className = {cls.footerBtn}
					onClick = {onEditProfile}
				>
					{t("подтвердить изменения")}
				</Button>
				<Button 
					theme = {ButtonTheme.ERROR}
					className = {cls.footerBtn}
					onClick = {onCancelEdit}
				>
					{t("отменить изменения")}
				</Button>
			</>
		)
	}

	// в зависимости от isAuthUser меняем начинку компонента
	return (
		<>
			{
				isAuthUser && 
				<div className = {cls.footerBtns}>
					<Button 
						className = {cls.footerBtn}
						theme = {ButtonTheme.BACKGROUND_INVERTED}
					>
						{t("подтвердить анкету")}
					</Button>
					<Button 
						className = {cls.footerBtn}
						theme = {ButtonTheme.BACKGROUND_INVERTED}
						onClick = {toAnkets}
					>
						{t("к анкетам")}
					</Button>
					<Button 
						className = {cls.footerBtn}
						theme = {ButtonTheme.ERROR}
						onClick = {onOpenModal}
					>
						{t("удалить анкету")}
					</Button>
				</div>
			}
			{
				isOpen && (
					<Portal>
						<DeleteAccountModal
							isOpen = {isOpen}
							onClose = {onCloseModal}
						/>
					</Portal>
				)
			}
		</>
	)
}