import { classNames } from "shared/lib/classNames/classNames"
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
import WrongIcon from "shared/assets/icons/Wrong-icon.svg"

interface AnketCardProps {
	className?: string;
}

const mockData = {
	firstname: "Вася",
	about: "Чипсы, колы. Королева танцпола hjfghdfh gdg dfhg kdjg hdkf gdg dfg d",
	confirm: true,
	age: 56,
	avatar: DefaultImg
}

export const AnketCard = (props: AnketCardProps) => {

	const {
		className
	} = props

	const id = "h5VWQIdqhTREGxF7fy4osLc2UJ72"
	const navigate = useNavigate()
	const { t } = useTranslation(TranslationKeys.ANKETS_PAGE)

	const viewProfile = () => {
		navigate(`/profile/${id}`)
		window.scrollTo({top: 0, behavior: "smooth"})
	}

	return (
		<div className = {classNames(cls.AnketCard, {}, [className])}>
			<div className = {cls.imgWrap}>
				<img
					src = {mockData.avatar}
					width = {300}
					height = {320}
				/>
			</div>
			<div className = {cls.body}>
				<div className = {cls.infoWrap}>
					<div className = {cls.infoContainer}>
						<div className = {cls.name}>
							<Text
								text = {`${mockData.firstname}, ${mockData.age}`}
								size = {TextSize.ML}
							/>
							{mockData.confirm && 
							<span title = {t("Профиль подтвержден")}>
								<FamilyIcon className = {cls.icon}/>
							</span>
							}
						</div>
						<Text
							className = {cls.about}
							text = {mockData.about}
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
					>
						<CrossIcon/>
					</Button>
					<Button 
						circle 
						theme = {ButtonTheme.MONO} 
						circleSize = {CircleSize.XXL}
						className = {cls.btn}
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
	)
}