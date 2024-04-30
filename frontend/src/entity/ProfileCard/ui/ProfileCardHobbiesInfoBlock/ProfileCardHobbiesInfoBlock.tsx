import { Text } from "shared/ui/Text/Text"
import cls from "./ProfileCardHobbiesInfoBlock.module.scss"
import { SelectHobbies } from "entity/SelectHobbies"
import { TextArea } from "shared/ui/TextArea/TextArea"
import BucketIcon from "shared/assets/icons/bucket-icon.svg"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { classNames, Mods } from "shared/lib/classNames/classNames"
import { InfoBlockProps } from "../../model/types"
 
interface ProfileCardAboutInfoBlockProps extends InfoBlockProps {
	onChange?: (value: string[]) => void;
	data?: string[]
}

export const ProfileCardHobbiesInfoBlock = memo((props: ProfileCardAboutInfoBlockProps) => {
	
	const {
		areaPlaceholder,
		title,
		onChange,
		readonly,
		data
	} = props

	const { t } = useTranslation()
	const [ isError, setIsError ] = useState<boolean>(false)

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

	console.log("isError", isError)
	const mods: Mods = {
		[cls.errorArea]: isError
	}
	
	return (
		<div className = {cls.infoBlock}>
			<Text
				className = {cls.inputTitle}
				text = {title}
			/>
			<div className = {cls.areaWrap}>
				<TextArea
					className = {classNames(cls.area, mods, [])}
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
			{!readonly && <SelectHobbies
				isError = {isError}
				setIsError = {setIsError}
				data={data}
				onChange={onChange}
				value={t("раздел")}
				readonly = {readonly}
			/>}
		</div>
	)
})