import React, { FormEvent, memo, useCallback, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import cls from "./ProfileCard.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize } from "shared/ui/Text/Text"
import { Avatar } from "shared/ui/Avatar/Avatar"
import { Button, ButtonTheme, CircleSize } from "shared/ui/Button/Button"
import { Input } from "shared/ui/Input/Input"
import { Contact, Profile } from "../model/types"
import { ProfileCardFooterButtons } from "./ProfileCardFooterButtons/ProfileCardFooterButtons"
import { SelectFacultet } from "entity/SelectFacultet"
import { SelectCourse, Courses } from "entity/SelectCourse"
import { AvatarDetailModal } from "entity/AvatarDetail"
import { FaluctetsItem } from "shared/consts/faluctets"
import { ProfileCardEditingButtons } from "./ProfileCardEditingButtons/ProfileCardEditingButtons"
import { ProfileCardAboutInfoBlock } from "./ProfileCardAboutInfoBlock/ProfileCardAboutInfoBlock"
import { ProfileCardInterestedInfoBlock } from "./ProfileCardInterestedInfoBlock/ProfileCardInterestedInfoBlock"
import { ProfileCardHobbiesInfoBlock } from "./ProfileCardHobbiesInfoBlock/ProfileCardHobbiesInfoBlock"
import { ProfileCardContactsInfoBlock } from "./ProfileCardContactsInfoBlock/ProfileCardContactsInfoBlock"
import { ProfileCardSkeleton } from "./ProfileCardSkeleton/ProfileCardSkeleton"
import { Portal } from "shared/ui/Portal/Portal"
import { useNavigate } from "react-router"
import ArrowBack from "shared/assets/icons/arrow-back.svg"
import { Alert, AlertPosition, AlertTheme } from "shared/ui/Alert/Alert"
import AvatarImgDefault from "shared/assets/images/avatar-default.png"

interface ProfileCardProps {
	isAuthUser?: boolean;
	isLoading?: boolean;
	isAvatarAlert?: boolean;
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
		isLoading, className, isAuthUser, isAvatarAlert, data, onChangeAvatar,
		readonly, onEditProfile, onChangeReadonly, onChangeFirstname,
		onChangeLastname, onChangeFacultet, onChangeInterested, onChangeHobbies,
		onChangeContacts, onChangeAbout, onChangeCourse, onCancelEdit
	} = props

	const { t } = useTranslation(TranslationKeys.PROFILE_PAGE)
	const [ isOpen, setIsOpen ] = useState<boolean>()
	const [ isOpenSuccessAlert, setIsOpenSuccessAlert ] = useState<boolean>(false)
	const [ isOpenErrorAlert, setIsOpenErrorAlert ] = useState<boolean>(false)
	const filePickerRef = useRef(null)
	const navigate = useNavigate()

	const onOpenAvatarDetail = useCallback(() => {
		setIsOpen(true)
	}, [])

	const onCloseAvatarDetail = useCallback(() => {
		setIsOpen(false)
	}, [])

	const handlePick = () => {
		if (filePickerRef.current !== null) {
			//@ts-ignore
			filePickerRef.current.click()
		}
	}

	const goBack = () => {
		navigate(-1)
	}

	const viewContacts = data?.contacts || data?.contacts === null

	if (isLoading) {
		return (
			<div className = {classNames(cls.ProfileCard, {}, [className])}>
				<ProfileCardSkeleton/>
			</div>
		)
	}
	
	return (
		<div className = {classNames(cls.ProfileCard, {}, [className])}>
			<Button
				circle
				circleSize = {CircleSize.L}
				theme = {ButtonTheme.BACKGROUND_INVERTED}
				onClick = {goBack}
				className = {cls.backBtn}
			>
				<ArrowBack className = {cls.arrow}/>
			</Button>
			<Text
				title = {t("Информация о профиле")}
				size = {TextSize.L}
				className = {cls.headerTitle}
			/>
			<div className = {cls.header}>
				<div className = {cls.mainInfo}>
					<div className = {cls.avatarWrap}>
						<span onClick = {onOpenAvatarDetail}>
							{data?.avatar !== null ? 
								<Avatar className = {cls.avatar} avatarSrc = {data?.avatar} /> 
								:
								<img
									src = {AvatarImgDefault}
									width={100}
									height={125}
								/>
							}
						</span>
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
							text = {`${data?.age}, ` + t(`${data?.sex}`)}
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
					isAuthUser &&
					<div className = {cls.editingBtns}>
						<ProfileCardEditingButtons
							readonly = {readonly}
							onCancelEdit = {onCancelEdit}
							onChangeReadonly = {onChangeReadonly}
							onEditProfile = {onEditProfile}
							setIsOpenSuccess = {setIsOpenSuccessAlert}
							setIsOpenError = {setIsOpenErrorAlert}
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
				{
					viewContacts &&
					<div className = {cls.infoBlock}>
						<ProfileCardContactsInfoBlock
							title = {t("Контакты")}
							areaPlaceholder = {t("Вы можете оставить свои контакты для тех, с кем построите взаимную симпатию")}
							data = {data?.contacts}
							onChange = {onChangeContacts}
							readonly = {readonly}
						/>
					</div>
				}
				
			</div>
			<ProfileCardFooterButtons
				viewButtons = {viewContacts as boolean}
				isAuthUser = {isAuthUser}
				readonly = {readonly}
				onCancelEdit = {onCancelEdit}
				onEditProfile = {onEditProfile}
			/>
			{
				isOpen &&
				<Portal>
					<AvatarDetailModal
						isOpen = {isOpen}
						onClose = {onCloseAvatarDetail}
						src = {data?.avatar}
					/>
				</Portal>
			}
			{
				isOpenSuccessAlert &&
				<Alert
					position = {AlertPosition.TOP_RIGHT}
					theme = {AlertTheme.SUCCESS}
					text = {"На вашу почту пришло письмо!"}
					className = {cls.alert}
				/>
			}
			{
				isOpenErrorAlert &&
				<Alert
					position = {AlertPosition.TOP_RIGHT}
					theme = {AlertTheme.ERROR}
					text = {"Что-то пошло не так"}
					className = {cls.alert}
				/>
			}
			{
				isAvatarAlert &&
				<Alert
					position = {AlertPosition.TOP_RIGHT}
					theme = {AlertTheme.ERROR}
					text = {"Выберите файл меньше 4мб"}
					className = {cls.alert}
				/>
			}
		</div>	
	)
})