import React, { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ProfilePage.module.scss"
import { Page } from "widgets/Page"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { EditableProfileCard, editableProfileReducer, getProfileState } from "feautures/EditableProfile"
import { useSelector } from "react-redux"

const reducers: ReducersList = {
	editableProfile: editableProfileReducer
}

const ProfilePage = () => {
	
	const state = useSelector(getProfileState)
	
	return (
		<DynamicModuleLoader reducers = {reducers} removeAfterUnmount>
			<Page className = {classNames(cls.ProfilePage, {}, [])}>
				{state && <EditableProfileCard/>}
			</Page>
		</DynamicModuleLoader>
		
	)
}

export default memo(ProfilePage)