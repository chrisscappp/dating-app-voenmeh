import { classNames } from "shared/lib/classNames/classNames"
import { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { NotificationsFormAsync } from "../NotificationsForm/Notifications.async"
import { Loader } from "shared/ui/Loader/Loader"
import { NotificationType } from "../../model/types/types"

interface NotificationsModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
	notifications: NotificationType[];
	error: string;
	isLoading: boolean;
	removeNotifications: () => void
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
	)
}