import { classNames } from "shared/lib/classNames/classNames"
import cls from "./SelectContacts.module.scss"
import React, { Dispatch, memo, SetStateAction, useCallback, useEffect, useState}  from "react"
import { Select, SelectOption } from "shared/ui/Select/Select"
import { Contacts } from "../model/types"
import { Input } from "shared/ui/Input/Input"
import { Button, ButtonTheme, CircleSize } from "shared/ui/Button/Button"
import { Contact } from "entity/ProfileCard"

interface SelectContactsProps {
	setValue?: Dispatch<SetStateAction<Contacts>>;
	setIsError?: Dispatch<SetStateAction<boolean>>;
	className?: string;
	onChange?: (value: Contact) => void;
	value?: Contacts,
	readonly?: boolean,
	label?: string;
	data?: Contact;
}

const hobbiesOptions: SelectOption[] = [
	{value: "empty", content: "Поле для редактирования:"},
	{value: Contacts.VK, content: Contacts.VK},
	{value: Contacts.TELEGRAM, content: Contacts.TELEGRAM},
	{value: Contacts.PHONE, content: Contacts.PHONE}
]

export const SelectContacts = memo((props: SelectContactsProps) => {

	const { 
		setValue,
		setIsError,
		className,
		onChange,
		value,
		readonly,
		label,
		data
	} = props

	const [ contact, setContact ] = useState<string>("")
 
	const onChangeContact = useCallback((value: string) => {
		setContact(value)
		setIsError?.(false)
	}, [setIsError])

	const onChangeHandler = useCallback((value: string) => {
		if (value !== "empty") {
			setValue?.(value as Contacts)
		}
	}, [setValue])

	const onPushContact = useCallback(() => {
		const copyData: Contact = data ? JSON.parse(JSON.stringify(data)) : {}
		if (contact && value !== Contacts.EMPTY && value) {
			copyData[value] = contact
		} else {
			setIsError?.(true)
		}
		onChange?.(copyData)
	}, [contact, data, onChange, setIsError, value])	

	useEffect(() => {
		return () => {
			setIsError?.(false)
		}
	}, [setIsError])

	return (
		<div className = {cls.selectWrap}>
			<div className = {cls.changeElemsWrap}>
				<Select
					className = {classNames(cls.selectHobbies, {}, [className])}
					options={hobbiesOptions}
					onChange={onChangeHandler}
					value = {value}
					readonly = {readonly}
				/>
				<div className = {cls.inputWrap}>
					<Input
						placeholder = "оставьте ссылку на соц сеть"
						className = {cls.inputContact}
						value = {contact}
						onChange = {onChangeContact}
						readonly = {readonly}
					/>
					<Button
						onClick = {onPushContact}
						className = {cls.addBtn}
						circle
						circleSize = {CircleSize.M}
						theme = {ButtonTheme.BACKGROUND_INVERTED}
					>
							+
					</Button>
				</div>
			</div>
		</div>
	)
})