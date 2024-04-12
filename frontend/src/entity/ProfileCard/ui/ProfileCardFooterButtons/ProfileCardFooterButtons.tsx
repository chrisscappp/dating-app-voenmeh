import { Button, ButtonTheme } from "shared/ui/Button/Button"
import cls from "./ProfileCardFooterButtons.module.scss"
import { useNavigate } from "react-router"
import { IUser } from "entity/User"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"

interface ProfileCardFooterButtonsProps {
	authData?: IUser
	userId?: string
	readonly?: boolean
	onCancelEdit?: () => void;
	onEditProfile?: () => void;
}

export const ProfileCardFooterButtons = (props: ProfileCardFooterButtonsProps) => {
	
	const {
		authData,
		userId,
		readonly,
		onCancelEdit,
		onEditProfile
	} = props

	const navigate = useNavigate()
	const { t } = useTranslation(TranslationKeys.PROFILE_PAGE)

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

	return (
		<>
			{
				authData?.userId === userId && 
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
					>
						{t("удалить анкету")}
					</Button>
				</div>
			}
		</>
	)
}