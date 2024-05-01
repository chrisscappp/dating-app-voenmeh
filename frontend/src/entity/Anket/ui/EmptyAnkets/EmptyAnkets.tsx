import { Text, TextSize } from "shared/ui/Text/Text"
import cls from "./EmptyAnkets.module.scss"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

export const EmptyAnkets = () => {

	const { t } = useTranslation()
	const navigate = useNavigate()

	return (
		<div className = {cls.emptyList}>
			<Text 
				text = {"Список анкет пуст :("} 
				size = {TextSize.ML}
				className = {cls.emptyText}
			/>
			<Button
				theme = {ButtonTheme.BACKGROUND_INVERTED}
				className = {cls.emptyBtn}
				onClick = {() => navigate("/ankets")}
			>
				{t("к разделам")}
			</Button>
		</div>
	)
}