import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./AnketCard.module.scss"
import DefaultImg from "shared/assets/images/avatar-default.png"
import { Text, TextSize } from "shared/ui/Text/Text"
import FamilyIcon from "shared/assets/icons/family-icon.svg"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Button, ButtonTheme, CircleSize } from "shared/ui/Button/Button"
import QuestionIcon from "shared/assets/icons/question-icon.svg"
import CrossIcon from "shared/assets/icons/cross-icon.svg"
import LikeIcon from "shared/assets/icons/like-icon.svg"
import WrongIcon from "shared/assets/icons/wrong-icon.svg"
import { IUser } from "entity/User"
import { Alert, AlertPosition, AlertTheme } from "shared/ui/Alert/Alert"
import { CSSProperties, memo, useCallback, useState } from "react"

interface AnketCardProps {
	className?: string;
	user?: IUser;
}

export const AnketCard = memo((props: AnketCardProps) => {

	const {
		className,
		user
	} = props

	const navigate = useNavigate()
	const { t } = useTranslation(TranslationKeys.ANKETS_PAGE)
	const [ isOpenSuccess, setIsOpenSuccess ] = useState<boolean>(false)
	const [ isOpenError, setIsOpenError ] = useState<boolean>(false)
	const [ isDisabled, setIsDisabled ] = useState<boolean>(false)
	const [ cardStyles, setCardStyles ] = useState<CSSProperties>()

	const viewProfile = () => {
		navigate(`/profile/${user?.userId}`)
		window.scrollTo({top: 0, behavior: "smooth"})
	}

	const onLikeAnket = useCallback(() => {
		setIsOpenSuccess(true)
		setIsDisabled(true)
		setCardStyles({
			background: "var(--liked-anket-bg-color)"
		})
		setTimeout(() => setIsOpenSuccess(false), 5000)
	}, [])

	const onDislikeAnket = useCallback(() => {
		setIsOpenError(true)
		setIsDisabled(true)
		setCardStyles({
			background: "var(--disliked-anket-bg-color)"
		})
		setTimeout(() => setIsOpenError(false), 5000)
	}, [])
	return (
		<div className = {classNames(cls.AnketCardWrap, {}, [className])}>
			<div style = {cardStyles} className = {classNames(cls.AnketCard, {}, [])}>
				<div className = {cls.imgWrap} onClick = {viewProfile}>
					{user?.avatar ? <img
						width = {300}
						height = {320}
						style = {{
							background: `url(${user?.avatar}) center center/cover`
						}}
						className = {cls.img}
					/> : <img
						width={300}
						height={320}
						src = {DefaultImg}
					/>}
				
				</div>
				<div className = {cls.body}>
					<div className = {cls.infoWrap}>
						<div className = {cls.infoContainer}>
							<div className = {cls.name}>
								<Text
									text = {`${user?.firstname}, ${user?.age}`}
									size = {TextSize.ML}
								/>
								{user?.confirm && 
							<span title = {t("Профиль подтвержден")}>
								<FamilyIcon className = {cls.icon}/>
							</span>
								}
							</div>
							<Text
								className = {cls.about}
								text = {user?.about}
								size = {TextSize.ML}
							/>
						</div>
					</div>
					<div className = {cls.btns}>
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
							disabled = {isDisabled}
						>
							<CrossIcon/>
						</Button>
						<Button 
							circle 
							theme = {ButtonTheme.MONO} 
							circleSize = {CircleSize.XXL}
							className = {cls.btn}
							onClick = {onLikeAnket}
							disabled = {isDisabled}
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
				</div>
			</div>
			{
				isOpenSuccess &&
				<Alert
					isOpen = {isOpenSuccess}
					text = {"Лайк отправлен!"}
					theme = {AlertTheme.SUCCESS}
					position = {AlertPosition.BOTTOM_RIGHT}
				/>
			}
			{
				isOpenError &&
				<Alert
					isOpen = {isOpenError}
					text = {"Анкета отклонена"}
					theme = {AlertTheme.ERROR}
					position = {AlertPosition.BOTTOM_RIGHT}
				/>
			}
		</div>
	)
})