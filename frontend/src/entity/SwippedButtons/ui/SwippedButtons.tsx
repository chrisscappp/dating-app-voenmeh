import { memo, useCallback } from "react"
import { Button, ButtonTheme, CircleSize } from "shared/ui/Button/Button"
import cls from "./SwippedButtons.module.scss"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import QuestionIcon from "shared/assets/icons/question-icon.svg"
import CrossIcon from "shared/assets/icons/cross-icon.svg"
import LikeIcon from "shared/assets/icons/like-icon.svg"
import WrongIcon from "shared/assets/icons/wrong-icon.svg"
import { classNames } from "shared/lib/classNames/classNames"
import { useNavigate } from "react-router"
import { useMobile } from "shared/lib/hooks/useMobile"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { dislikeAnketCard, getInteractAnketsTopStack, likeAnketCard } from "entity/Anket"
import { useSelector } from "react-redux"

interface SwippedButtonsProps {
	className?: string;
	mountCross?: boolean,
	mountQuestion?: boolean,
	mountLike?: boolean,
	mountWrong?: boolean,
	swipe?: (dir: string) => void;
	callback?: (id: string) => void;
	viewId?: string;
}

// говнокод

export const SwippedButtons = memo((props: SwippedButtonsProps) => {

	const { 
		className, 
		mountCross = true,
		mountLike,
		mountQuestion,
		mountWrong,
		swipe,
		callback,
		viewId
	} = props

	const { t } = useTranslation(TranslationKeys.ANKETS_PAGE)

	const navigate = useNavigate()
	const mobile = useMobile()
	const dispatch = useAppDispatch()
	const topStack = useSelector(getInteractAnketsTopStack)

	const viewProfile = () => {
		navigate(`/profile/${viewId ? viewId : topStack}`)
		window.scrollTo({top: 0, behavior: "smooth"})
	}

	const onLikeAnket = useCallback(async () => {
		const response = await dispatch(likeAnketCard(topStack ? topStack : viewId ? viewId : ""))
		if (response.meta.requestStatus === "fulfilled") {
			!mobile && swipe?.("right")
		}
	}, [dispatch, mobile, swipe, topStack, viewId])

	const onDislikeAnket = useCallback(async () => {
		const response = await dispatch(dislikeAnketCard(topStack ? topStack : viewId ? viewId : ""))
		if (response.meta.requestStatus === "fulfilled") {
			!mobile && swipe?.("left")
			callback?.(viewId ? viewId : "")
		}
	}, [callback, dispatch, mobile, swipe, topStack, viewId])

	return (
		<div className = {classNames(cls.btns, {}, [className])}>
			{
				mountQuestion && 
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
			}
			{
				mountCross && 
				<Button 
					circle 
					theme = {ButtonTheme.MONO} 
					circleSize = {CircleSize.XXL}
					className = {cls.btn}
					onClick = {onDislikeAnket}
				>
					<CrossIcon/>
				</Button>
			}
			{
				mountLike &&
				<Button 
					circle 
					theme = {ButtonTheme.MONO} 
					circleSize = {CircleSize.XXL}
					className = {cls.btn}
					onClick = {onLikeAnket}
				>
					<LikeIcon/>
				</Button>
			}
			{
				mountWrong &&
				<Button 
					circle 
					theme = {ButtonTheme.MONO}
					circleSize = {CircleSize.L}
					className = {cls.btn}
					title = {t("Пожаловаться на анкету")}
				>
					<WrongIcon/>
				</Button>
			}
		</div>
	)
})