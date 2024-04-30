import { Text } from "shared/ui/Text/Text"
import cls from "./ProfileCardAboutInfoBlock.module.scss"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { TextArea } from "shared/ui/TextArea/TextArea"
import { InfoBlockProps } from "../../model/types"
import { memo } from "react"

interface ProfileCardAboutInfoBlockProps extends InfoBlockProps {
	onChange?: (value: string) => void;
}

export const ProfileCardAboutInfoBlock = memo((props: ProfileCardAboutInfoBlockProps) => {

	const {
		onChange,
		readonly,
		data,
		title,
		areaPlaceholder
	} = props

	const { t } = useTranslation(TranslationKeys.PROFILE_PAGE)

	return (
		<div className = {cls.infoBlock}>
			<Text
				className = {cls.inputTitle}
				text = {title}
			/>
			<TextArea
				className = {cls.input}
				readonly = {readonly}
				placeholder = {areaPlaceholder}
				value = {data as string}
				onChange = {onChange}
			/>
		</div>
	)
})