import { classNames } from "shared/lib/classNames/classNames"
import { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { ChangePasswordFormAsync } from "../ChangePasswordForm/ChangePasswordForm.async"
import { Loader } from "shared/ui/Loader/Loader"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { changePasswordReducer } from "../../model/slice/changePasswordSlice"

interface ChangePasswordModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
	onOpenSuccessAlert?: () => void;
	onOpenErrorAlert?: () => void;
}

const initialReducers: ReducersList = {
	changePassword: changePasswordReducer
}

export const ChangePasswordModal = (props: ChangePasswordModalProps) => {

	const {
		isOpen,
		onClose,
		className,
		onOpenErrorAlert,
		onOpenSuccessAlert
	} = props

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
			<Modal 
				className = {classNames("", {}, [className])}
				isOpen = {isOpen}
				onClose = {onClose}
			>
				<Suspense fallback = {<Loader/>}>
					<ChangePasswordFormAsync
						onClose = {onClose}
						onOpenErrorAlert = {onOpenErrorAlert}
						onOpenSuccessAlert = {onOpenSuccessAlert}
					/>
				</Suspense>
			</Modal>
		</DynamicModuleLoader>
	)
}