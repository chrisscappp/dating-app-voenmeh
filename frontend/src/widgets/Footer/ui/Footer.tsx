import { memo, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import cls from "./Footer.module.scss"
import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextAlign, TextSize, TextTheme } from "shared/ui/Text/Text";
import LogoFooter from "shared/assets/icons/logo-footer.svg"

interface FooterProps {
	className?: string;
}

const links = [
	{ link: "https://vk.com/grihapro2004", developerName: "Griha Pro" },
	{ link: "https://vk.com/tzhrv", developerName: "Timoxxxa777" },
	{ link: "https://vk.com/chrisscapp", developerName: "BORSHEY" }
]

export const Footer = memo((props: FooterProps) => {
	
	const { t } = useTranslation(TranslationKeys.FOOTER)

	const {
		className
	} = props

	const onFollowUrl = (url: string) => {
		open(url, "_blank")
	}

	const iteratedLinks = useMemo(() => {
		return links.map(item => {
			return (
				<span onClick = {() => onFollowUrl(item.link)}>
				<Text
					text = {`“${item.developerName}” - ${item.link}`}
					theme = {TextTheme.GREY}
					className = {cls.text}
					link
				/>	
				</span>
			)
		})
	}, [])
	
	return (
		<div className = {classNames(cls.Footer, {}, [className])}>
			<div className = {cls.contentWrapper}>
				<div className = {cls.developers}>
					<div className = {cls.developersTitle}>
						<LogoFooter/>
						<Text
							text = {t("Военмех. Знакомства")}
							className = {cls.title}
						/>
					</div>
					<div className = {cls.developersText}>
						<Text 
							text = {t("Команда разработчиков:")}
							theme = {TextTheme.GREY}
						/>
						<Text 
							text = {t("Гриша")}
							theme = {TextTheme.GREY}
							className = {cls.text}
						/>
						<Text 
							text = {t("Тимоха")}
							theme = {TextTheme.GREY}
							className = {cls.text}
						/>
						<Text 
							text = {t("Саня")}
							theme = {TextTheme.GREY}
							className = {cls.text}
						/>
					</div>
				</div>
				<div className = {cls.information}>
					<Text
						text = {t("Информация")}
						className = {cls.informationTitle}
					/>
					<Text
						text = {t("Приложение реализовано")}
						theme = {TextTheme.GREY}
						className = {cls.informationText}
					/>
					<Text
						text = {t("Все права")}
						theme = {TextTheme.GREY}
						className = {cls.informationText}
					/>
				</div>
				<div className = {cls.contacts}>
					<Text
						text = {t("Контакты")}
						className = {cls.informationTitle}
					/>
					<div className = {cls.contactsText}>
						{iteratedLinks}
					</div>
				</div>
			</div>
		</div>
	)
})
