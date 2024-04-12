import { Text } from "shared/ui/Text/Text"
import cls from "./ProfileCardContactsInfoBlock.module.scss"
import { TextArea } from "shared/ui/TextArea/TextArea"
import { Contact, InfoBlockProps } from "../../model/types"
import { Contacts, SelectContacts } from "entity/SelectContacts"
import BucketIcon from "shared/assets/icons/bucket-icon.svg"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { classNames, Mods } from "shared/lib/classNames/classNames"

interface ProfileCardContactsInfoBlockProps extends InfoBlockProps {
	data?: Contact
	onChange?: (value: Contact) => void;
}

type ContactKeys = keyof Contact

export const ProfileCardContactsInfoBlock = (props: ProfileCardContactsInfoBlockProps) => {
	
	const {
		areaPlaceholder,
		onChange,
		readonly,
		title,
		data
	} = props

	const { t } = useTranslation()
	const [ value, setValue ] = useState<Contacts>(Contacts.EMPTY)
	const [ isError, setIsError ] = useState<boolean>(false)

	const removeLastOption = useCallback(() => {
		if (data) {
			const copyData: Contact = JSON.parse(JSON.stringify(data))
			const keys = Object.keys(data) as ContactKeys[]
			delete copyData[keys[keys.length - 1]]
			onChange?.(copyData)
		}
	}, [data, onChange])

	const parseContacts = useMemo(() => {
		if (data) {
			return Object.entries(data).map(item => item.join(": "))
		} else {
			return []
		}
	}, [data])

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
					className = {classNames(cls.input, mods, [])}
					readonly = {readonly}
					placeholder = {areaPlaceholder}
					value = {parseContacts.join(", \n")}
				/>
				{!readonly && 
				<span title = {t("Удалить последний элемент списка")}>
					<BucketIcon 
						className = {cls.icon}
						onClick = {removeLastOption}
					/>
				</span>}
			</div>
			{!readonly && <SelectContacts
				setValue = {setValue}
				setIsError = {setIsError}
				data={data}
				onChange={onChange}
				value={value}
				label = "Соц сеть"
				readonly = {readonly}
			/>}
		</div>
	)
}