import React, { FormEvent, memo, useRef } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import cls from "./ProfileCard.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize } from "shared/ui/Text/Text"
import { Avatar } from "shared/ui/Avatar/Avatar"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Input } from "shared/ui/Input/Input"
import { useSelector } from "react-redux"
import { getUserAuthData } from "entity/User"
import { Contact, Profile } from "../model/types"
import { ProfileCardFooterButtons } from "./ProfileCardFooterButtons/ProfileCardFooterButtons"
import { SelectFacultet } from "entity/SelectFacultet"
import { SelectCourse, Courses } from "entity/SelectCourse"
import { FaluctetsItem } from "shared/consts/faluctets"
import { ProfileCardEditingButtons } from "./ProfileCardEditingButtons/ProfileCardEditingButtons"
import { ProfileCardAboutInfoBlock } from "./ProfileCardAboutInfoBlock/ProfileCardAboutInfoBlock"
import { ProfileCardInterestedInfoBlock } from "./ProfileCardInterestedInfoBlock/ProfileCardInterestedInfoBlock"
import { ProfileCardHobbiesInfoBlock } from "./ProfileCardHobbiesInfoBlock/ProfileCardHobbiesInfoBlock"
import { ProfileCardContactsInfoBlock } from "./ProfileCardContactsInfoBlock/ProfileCardContactsInfoBlock"
import { ProfileCardSkeleton } from "./ProfileCardSkeleton/ProfileCardSkeleton"

interface ProfileCardProps {
	isLoading?: boolean;
	userId?: string;
	className?: string;
	data?: Profile;
	readonly?: boolean;
	onEditProfile?: () => void;
	onChangeReadonly?: () => void;
	onChangeFirstname?: (value: string) => void;
	onChangeLastname?: (value: string) => void;
	onChangeAvatar?: (e: FormEvent<HTMLInputElement>) => void;
	onChangeFacultet?: (value: FaluctetsItem) => void;
	onChangeInterested?: (value: string[]) => void;
	onChangeHobbies?: (value: string[]) => void;
	onChangeContacts?: (value: Contact) => void;
	onChangeAbout?: (value: string) => void;
	onChangeCourse?: (value: Courses) => void;
	onCancelEdit?: () => void;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
	
	const {
		isLoading, className, userId, data, onChangeAvatar,
		readonly, onEditProfile, onChangeReadonly, onChangeFirstname,
		onChangeLastname, onChangeFacultet, onChangeInterested, onChangeHobbies,
		onChangeContacts, onChangeAbout, onChangeCourse, onCancelEdit
	} = props

	const authData = useSelector(getUserAuthData)
	const { t } = useTranslation(TranslationKeys.PROFILE_PAGE)
	const filePickerRef = useRef(null)

	const handlePick = () => {
		if (filePickerRef.current !== null) {
			//@ts-ignore
			filePickerRef.current.click()
		}
	}

	if (isLoading) {
		return (
			<div className = {classNames(cls.ProfileCard, {}, [className])}>
				<ProfileCardSkeleton/>
			</div>
		)
	}
	
	return (
		<div className = {classNames(cls.ProfileCard, {}, [className])}>
			<Text
				title = {t("Информация о профиле")}
				size = {TextSize.L}
				className = {cls.headerTitle}
			/>
			<div className = {cls.header}>
				<div className = {cls.mainInfo}>
					<div className = {cls.avatarWrap}>
						<Avatar className = {cls.avatar} avatarSrc = {data?.avatar} />
						{ !readonly && 
							(
								<>
									<input 
										accept = "image/*" 
										ref = {filePickerRef}
										type = {"file"} 
										onChange = {onChangeAvatar}
										className = {cls.hidden}
									/>
									<Button 
										className = {cls.uploadAvatar}
										theme = {ButtonTheme.BACKGROUND_INVERTED}
										onClick = {handlePick}
									>
										{t("загрузить")}
									</Button>
								</>		
							)	
						}
					</div>
					<div className = {cls.headerText}>
						{readonly ?
							<Text
								size = {TextSize.L}
								text = {`${data?.firstname} ${data?.lastname}`}
							/>
							:
							<div className = {cls.name}>
								<Input
									value={data?.firstname}
									onChange = {onChangeFirstname}
								/>
								<Input
									className = {cls.inputLastname}
									value={data?.lastname}
									onChange = {onChangeLastname}
								/>
							</div>
						}
						<Text
							text = {`${data?.birthday}, ` + t(`${data?.sex}`)}
							className = {cls.age}
						/>
						<div className = {cls.selectorsWrap}>
							{readonly ? 
								<Text
									text = {
										data?.faculty ? 
											t(`Факультет "${data?.faculty}"`) + ", "
											: t("Факультет не выбран,")
									}
								/>
								: <SelectFacultet
									value = {data?.faculty}
									onChange = {onChangeFacultet}
									readonly = {readonly}
								/>
							}
							{readonly ?
								<Text
									text = {
										data?.course ?
											`${data?.course} ` + t("Курс").toLowerCase()
											: t("курс не указан")
									}
									className = {cls.course}
								/>
								: <SelectCourse
									className = {cls.selectCourse}
									value = {String(data?.course)}
									onChange = {onChangeCourse}
									readonly = {readonly}
								/>
							}
						</div>
					</div>
				</div>
				{
					authData?.userId === userId &&
					<div className = {cls.editingBtns}>
						<ProfileCardEditingButtons
							readonly = {readonly}
							onCancelEdit = {onCancelEdit}
							onChangeReadonly = {onChangeReadonly}
							onEditProfile = {onEditProfile}
						/>
					</div>
				}
			</div>
			<div className = {cls.body}>
				<div className = {cls.infoBlock}>
					<ProfileCardAboutInfoBlock
						title = {t("О себе")}
						areaPlaceholder = {t("Расскажите коротко о себе. Почему вы здесь?")}
						onChange = {onChangeAbout}
						readonly = {readonly}
						data = {data?.about}
					/>
				</div>
				<div className = {cls.infoBlock}>
					<ProfileCardInterestedInfoBlock
						title = {t("Мне интересны")}
						areaPlaceholder = {t("Кого вы хотите найти?")}
						data = {data?.interested}
						onChange = {onChangeInterested}
						readonly = {readonly}
					/>
				</div>
				<div className = {cls.infoBlock}>
					<ProfileCardHobbiesInfoBlock
						title = {t("Увлечения")}
						areaPlaceholder = {t("Расскажите о ваших хобби, интересах")}
						data = {data?.hobbies}
						onChange = {onChangeHobbies}
						readonly = {readonly}
					/>
				</div>
				<div className = {cls.infoBlock}>
					<ProfileCardContactsInfoBlock
						title = {t("Контакты")}
						areaPlaceholder = {t("Вы можете оставить свои контакты для тех, с кем построите взаимную симпатию")}
						data = {data?.contacts}
						onChange = {onChangeContacts}
						readonly = {readonly}
					/>
				</div>
			</div>
			<ProfileCardFooterButtons
				authData = {authData}
				userId = {userId}
				readonly = {readonly}
				onCancelEdit = {onCancelEdit}
				onEditProfile = {onEditProfile}
			/>
		</div>	
	)
})