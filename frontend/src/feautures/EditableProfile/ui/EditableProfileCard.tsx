import React, { FormEvent, memo, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { Contact, ProfileCard } from "entity/ProfileCard"
import { useParams } from "react-router"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { getProfileData } from "../model/selectors/getProfileData/getProfileData"
import { getProfileForm } from "../model/selectors/getProfileForm/getProfileForm"
import { getProfileIsLoading } from "../model/selectors/getProfileIsLoading/getProfileIsLoading"
import { getProfileReadonly } from "../model/selectors/getProfileReadonly/getProfileReadonly"
import { getProfileError } from "../model/selectors/getProfileError/getProfileError"
import { fetchAnketCardData } from "entity/Anket"
import { editableProfileActions } from "../model/slice/profileSlice"
import { FaluctetsItem } from "shared/consts/faluctets"
import { Courses } from "entity/SelectCourse"
import { getUserAuthData } from "entity/User"
import { updateProfileData } from "../model/services/updateProfileData/updateProfileData"
import cls from "./EditableProfileCard.module.scss"
import { Text, TextAlign } from "shared/ui/Text/Text"
import { Button, ButtonTheme } from "shared/ui/Button/Button"

interface EditableProfileCardProps {
	className?: string;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {

	const { id: userId } = useParams()
	const dispatch = useAppDispatch()

	const formData = useSelector(getProfileData)
	const formEditableData = useSelector(getProfileForm)
	const isLoading = useSelector(getProfileIsLoading)
	const readonly = useSelector(getProfileReadonly)
	const error = useSelector(getProfileError)
	const authData = useSelector(getUserAuthData)

	useEffect(() => {
		dispatch(fetchAnketCardData(userId ? userId : ""))
	}, [dispatch, userId])

	const onEditProfile = useCallback(async () => {
		if (JSON.stringify(formData) !== JSON.stringify(formEditableData)) {
			await dispatch(updateProfileData(authData?.userId ? authData.userId : ""))
		} else {
			dispatch(editableProfileActions.setReadonly(true))
		}
		window.scrollTo({ top: 0, behavior: "smooth" })
	}, [authData?.userId, dispatch, formData, formEditableData])

	const onChangeReadonly = useCallback(() => {
		dispatch(editableProfileActions.setReadonly(false))
	}, [dispatch])

	const onChangeFirstname = useCallback((value: string) => {
		dispatch(editableProfileActions.updateProfileField({ firstname: value }))
	}, [dispatch])

	const onChangeLastname = useCallback((value: string) => {
		dispatch(editableProfileActions.updateProfileField({ lastname: value }))
	}, [dispatch])

	const onChangeAvatar = useCallback((e: FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement & {
			files: FileList
		}
		if (target.files[0].size < 4200000) {
			const file = new FileReader()
			file.onload = function() {
				dispatch(editableProfileActions.updateProfileField({ avatar: file.result as string }))
			}
			file.readAsDataURL(target.files[0])
		} else {
			alert("Выберите файл меньше 4мб")
		}
	}, [dispatch])

	const onChangeFacultet = useCallback((value: FaluctetsItem) => {
		dispatch(editableProfileActions.updateProfileField({ faculty: value }))
	}, [dispatch])
	
	const onChangeCourse = useCallback((value: Courses) => {
		dispatch(editableProfileActions.updateProfileField({ course: Number(value) }))
	}, [dispatch])

	const onChangeAbout = useCallback((value: string) => {
		dispatch(editableProfileActions.updateProfileField({ about: value }))
	}, [dispatch])

	const onChangeInterested = useCallback((value: string[]) => {
		dispatch(editableProfileActions.updateProfileField({ interested: value }))
	}, [dispatch])

	const onChangeHobbies = useCallback((value: string[]) => {
		dispatch(editableProfileActions.updateProfileField({ hobbies: value }))
	}, [dispatch])

	const onChangeContacts = useCallback((value: Contact) => {
		dispatch(editableProfileActions.updateProfileField({ contacts:  value}))
	}, [dispatch])

	const onCancelEdit = useCallback(() => {
		dispatch(editableProfileActions.cancelEdit())
	}, [dispatch])

	if (error) {
		return (
			<div className = {cls.errorWrap}>
				<Text
					text = {error}
					align = {TextAlign.CENTER}
				/>
				<Button 
					className = {cls.reloadlPage} 
					theme = {ButtonTheme.BACKGROUND_INVERTED}
					onClick = {() => window.location.reload()}
				>
					обновить страницу
				</Button>
			</div>
		)
	}

	const isAuthUser = authData?.userId === userId

	return (
		<ProfileCard
			isAuthUser = {isAuthUser}
			isLoading = {isLoading}
			data={formEditableData}
			readonly = {readonly}
			onEditProfile = {onEditProfile}
			onChangeReadonly = {onChangeReadonly}
			onChangeFirstname = {onChangeFirstname}
			onChangeLastname = {onChangeLastname}
			onChangeAvatar = {onChangeAvatar}
			onChangeInterested = {onChangeInterested}
			onChangeHobbies = {onChangeHobbies}
			onChangeContacts = {onChangeContacts}
			onChangeFacultet = {onChangeFacultet}
			onChangeCourse = {onChangeCourse}
			onChangeAbout = {onChangeAbout}
			onCancelEdit = {onCancelEdit}
		/>
	)
})