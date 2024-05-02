import { memo, useCallback, useState } from "react"
import { Button, ButtonTheme, CircleSize } from "shared/ui/Button/Button"
import cls from "./SwippedButtons.module.scss"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import QuestionIcon from "shared/assets/icons/question-icon.svg"
import CrossIcon from "shared/assets/icons/cross-icon.svg"
import LikeIcon from "shared/assets/icons/like-icon.svg"
import WrongIcon from "shared/assets/icons/wrong-icon.svg"
import TelegramIcon from "shared/assets/icons/telegram-icon.svg"
import VKIcon from "shared/assets/icons/vk-icon.svg"
import { classNames } from "shared/lib/classNames/classNames"
import { useNavigate } from "react-router"
import { useMobile } from "shared/lib/hooks/useMobile"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { dislikeAnketCard, getInteractAnketsTopStack, likeAnketCard } from "entity/Anket"
import { useSelector } from "react-redux"
import { fetchAnketContacts } from "entity/Anket"
import { Contact } from "entity/ProfileCard"
import { Portal } from "shared/ui/Portal/Portal"
import { WrongAnketModal } from "feautures/WrongAnket"

interface SwippedButtonsProps {
	className?: string;
	mountCross?: boolean,
	mountQuestion?: boolean,
	mountLike?: boolean,
	mountWrong?: boolean,
	mountTelegram?: boolean,
	mountVK?: boolean;
	swipe?: (dir: string) => void;
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
		mountTelegram,
		mountVK,
		swipe,
		viewId
	} = props

	const { t } = useTranslation(TranslationKeys.ANKETS_PAGE)

	const navigate = useNavigate()
	const mobile = useMobile()
	const dispatch = useAppDispatch()
	const topStack = useSelector(getInteractAnketsTopStack)
	const [ isOpenWrong, setIsOpenWrong ] = useState<boolean>(false)

	const onOpenWrong = useCallback(() => {
		setIsOpenWrong(true)
	}, [])

	const onCloseWrong = useCallback(() => {
		setIsOpenWrong(false)
	}, [])

	const viewProfile = () => {
		navigate(`/profile/${viewId ? viewId : topStack}`)
		window.scrollTo({top: 0, behavior: "smooth"})
	}

	const onLinkedTelegram = useCallback(async () => {
		const response = await dispatch(fetchAnketContacts(viewId ? viewId : ""))
		const payload = response?.payload as Contact
		if (payload.telegram) {
			if (payload.telegram.includes("https://t.me/")) {
				window.open(payload.telegram, "_blank")
			} else {
				window.open("https://t.me/" + payload.telegram, "_blank")
			}
		} else {
			alert(t("Пользователь не указал этот контакт"))
		}
	}, [dispatch, t, viewId])

	const onLinkedVK = useCallback(async () => {
		const response = await dispatch(fetchAnketContacts(viewId ? viewId : ""))
		const payload = response?.payload as Contact
		if (payload.vk) {
			if (payload.vk.includes("https://vk.com/")) {
				window.open(payload.vk, "_blank")
			} else {
				window.open("https://vk.com/" + payload.vk, "_blank")
			}
		} else {
			alert(t("Пользователь не указал этот контакт"))
		}
	}, [dispatch, t, viewId])

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
		}
	}, [dispatch, mobile, swipe, topStack, viewId])

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
					title = {t("Отклонить анкету")}
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
					title = {t("Отправить лайк")}
				>
					<LikeIcon/>
				</Button>
			}
			{
				mountTelegram &&
				<Button 
					circle 
					theme = {ButtonTheme.MONO} 
					circleSize = {CircleSize.XXL}
					className = {cls.btn}
					title = {t("Перейти в телеграм")}
					onClick = {onLinkedTelegram}
				>
					<TelegramIcon/>
				</Button>
			}
			{
				mountVK &&
				<Button 
					circle 
					theme = {ButtonTheme.MONO} 
					circleSize = {CircleSize.XXL}
					className = {cls.btn}
					title = {t("Перейти в ВК")}
					onClick = {onLinkedVK}
				>
					<VKIcon/>
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
					onClick = {onOpenWrong}
				>
					<WrongIcon/>
				</Button>
			}
			{
				isOpenWrong &&
				<Portal>
					<WrongAnketModal
						isOpen = {isOpenWrong}
						onClose = {onCloseWrong}
						wrongId = {viewId}
						onDislikeAnket = {onDislikeAnket}
					/>
				</Portal>
			}
		</div>
		
	)
})