import { classNames } from "shared/lib/classNames/classNames"
import cls from "./MainPageInfo.module.scss"
import { Text, TextSize } from "shared/ui/Text/Text";
import { useEffect, useMemo } from "react";
import { ConfigType } from "shared/config/mainPageInfoConfig/mainPageInfoConfig";
import { useTranslation } from "react-i18next";
import { TranslationKeys } from "shared/config/i18nConfig/translationConfig"

interface MainPageInfoProps {
	className?: string;
	infoObject: ConfigType
}

export const MainPageInfo = ({ className, infoObject }: MainPageInfoProps) => {

	const { t } = useTranslation(TranslationKeys.MAIN_PAGE)

	const mainPageinfo = useMemo(() => {
		return Object.values(infoObject).map(item => {
			return (
				<>
					<div className = {cls.infoWrapper}>
						<div className = {cls.content}>
							<div className = {cls.contentImage}>
								<img
									src = {item.imgUrl}
									className = {cls.image}
								/>
							</div>
							<div className = {cls.contentText}>
								<Text
									subTitle = {t(item.subTitle)}
									className = {cls.title}
									size = {TextSize.L}
								/>
								<Text
									text = {t(item.text)}
									className = {cls.description}
									size = {TextSize.ML}
								/>
								<Text
									text = {t(item.subText)}
									className = {cls.subDescription}
									size = {TextSize.ML}
								/>
							</div>
						</div>
					</div>
				</>
			)
		})
	}, [])

	return (
		<div className = {classNames(cls.MainPageInfo, {}, [className])}>
			{mainPageinfo}
		</div>
	)
}