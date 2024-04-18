import { classNames } from "shared/lib/classNames/classNames"
import React, { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { NotificationsFormAsync } from "../NotificationsForm/Notifications.async"
import { Loader } from "shared/ui/Loader/Loader"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { notificationsReducer } from "../../model/slice/notificationsSlice"

interface NotificationsModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
	notifications: string[];
	error: string;
	isLoading: boolean;
	removeNotifications: () => void
}

const initialReducers: ReducersList = {
	notifications: notificationsReducer
}

export const NotificationsModal = (props: NotificationsModalProps) => {

	const {
		error,
		isLoading,
		isOpen,
		notifications,
		onClose,
		className,
		removeNotifications
	} = props

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
			<Modal 
				className = {classNames("", {}, [className])}
				isOpen = {isOpen}
				onClose = {onClose}
			>
				<Suspense fallback = {<Loader/>}>
					<NotificationsFormAsync
						error = {error}
						isLoading = {isLoading}
						notifications = {notifications}
						removeNotifications = {removeNotifications}
					/>
				</Suspense>
			</Modal>
		</DynamicModuleLoader>
	)
}