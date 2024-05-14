import { Text } from "shared/ui/Text/Text"
import cls from "./ProfileCardInterestedInfoBlock.module.scss"
import { useTranslation } from "react-i18next"
import { SelectInterested } from "entity/SelectInterested"
import { TextArea } from "shared/ui/TextArea/TextArea"
import BucketIcon from "shared/assets/icons/bucket-icon.svg"
import React, { memo, useCallback, useMemo } from "react"
import { InfoBlockProps } from "../../model/types"

interface ProfileCardInterestedInfoBlockProps extends InfoBlockProps {
	onChange?: (value: string[]) => void;
	data?: string[]
}

export const ProfileCardInterestedInfoBlock = memo((props: ProfileCardInterestedInfoBlockProps) => {
	
	const {
		areaPlaceholder,
		title,
		data,
		onChange,
		readonly
	} = props

	const { t } = useTranslation()	

	const removeLastOption = useCallback(() => {
		const copyData = data ? [...data] : []
		copyData?.pop()
		onChange?.(copyData)
	}, [data, onChange])

	const translatedData = useMemo(() => {
		if (data) {
			return data?.map(item => t(item)).join(", ")
		} else {
			return ""
		}
	}, [data, t])

	return (
		<div className = {cls.infoBlock}>
			<Text
				className = {cls.inputTitle}
				text = {title}
			/>
			<div className = {cls.areaWrap}>
				<TextArea
					readonly = {readonly}
					placeholder = {areaPlaceholder}
					value = {translatedData}
				/>
				{!readonly && 
				<span title = {t("Удалить последний элемент списка")}>
					<BucketIcon 
						className = {cls.icon}
						onClick = {removeLastOption}
					/>
				</span>}
			</div>
			{!readonly && <SelectInterested
				className = {cls.select}
				data={data}
				onChange={onChange}
				value={t("раздел")}
				readonly = {readonly}
			/>}
		</div>
	)
})