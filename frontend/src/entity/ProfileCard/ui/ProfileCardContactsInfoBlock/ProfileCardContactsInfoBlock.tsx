import { Text } from "shared/ui/Text/Text"
import cls from "./ProfileCardContactsInfoBlock.module.scss"
import { TextArea } from "shared/ui/TextArea/TextArea"
import { InfoBlockProps } from "../../model/types"

interface ProfileCardContactsInfoBlockProps extends InfoBlockProps {
	data?: string[]
}

export const ProfileCardContactsInfoBlock = (props: ProfileCardContactsInfoBlockProps) => {
	
	const {
		areaPlaceholder,
		readonly,
		title,
		data
	} = props

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
				value = {data?.join(", \n")}
			/>
		</div>
	)
}