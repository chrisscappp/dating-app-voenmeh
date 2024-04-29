import { memo } from "react"
import { Button, ButtonTheme, CircleSize } from "shared/ui/Button/Button"
import cls from "./SwippedButtons.module.scss"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import QuestionIcon from "shared/assets/icons/question-icon.svg"
import CrossIcon from "shared/assets/icons/cross-icon.svg"
import LikeIcon from "shared/assets/icons/like-icon.svg"
import WrongIcon from "shared/assets/icons/wrong-icon.svg"
import { classNames } from "shared/lib/classNames/classNames"

interface SwippedButtonsProps {
	viewProfile?: () => void; 
	className?: string;
	onLikeAnket?: () => void;
	onDislikeAnket?: () => void;
}

export const SwippedButtons = memo((props: SwippedButtonsProps) => {

	const { 
		className, 
		viewProfile,
		onDislikeAnket,
		onLikeAnket
	} = props

	const { t } = useTranslation(TranslationKeys.ANKETS_PAGE)

	return (
		<div className = {classNames(cls.btns, {}, [className])}>
			<Button 
				circle 
				theme = {ButtonTheme.MONO}
				circleSize = {CircleSize.L}
				className = {cls.btn}
				onClick = {viewProfile}
				title = {t("Открыть профиль пользователя")}
			>
				<QuestionIcon className = {cls.questionIcon}/>
			</Button>
			<Button 
				circle 
				theme = {ButtonTheme.MONO} 
				circleSize = {CircleSize.XXL}
				className = {cls.btn}
				onClick = {onDislikeAnket}
			>
				<CrossIcon/>
			</Button>
			<Button 
				circle 
				theme = {ButtonTheme.MONO} 
				circleSize = {CircleSize.XXL}
				className = {cls.btn}
				onClick = {onLikeAnket}
			>
				<LikeIcon/>
			</Button>
			<Button 
				circle 
				theme = {ButtonTheme.MONO}
				circleSize = {CircleSize.L}
				className = {cls.btn}
				title = {t("Пожаловаться на анкету")}
			>
				<WrongIcon/>
			</Button>
		</div>
	)
})