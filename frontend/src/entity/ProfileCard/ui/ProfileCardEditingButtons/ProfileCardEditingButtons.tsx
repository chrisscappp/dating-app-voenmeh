import { Button, ButtonTheme } from "shared/ui/Button/Button"
import cls from "./ProfileCardEditingButtons.module.scss"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"

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
		</>
	)
}