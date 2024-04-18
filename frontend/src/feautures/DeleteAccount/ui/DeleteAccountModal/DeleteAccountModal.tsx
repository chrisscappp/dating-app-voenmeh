import { classNames } from "shared/lib/classNames/classNames"
import React, { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { DeleteAccountFormAsync } from "../DeleteAccountForm/DeleteAccountForm.async"
import { Loader } from "shared/ui/Loader/Loader"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { deleteAccountReducer } from "../../model/slice/deleteAccountSlice"

interface ChangePasswordModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

const initialReducers: ReducersList = {
	deleteAccount: deleteAccountReducer
}

export const DeleteAccountModal = ({ className, isOpen, onClose }: ChangePasswordModalProps) => {

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
			<Modal 
				className = {classNames("", {}, [className])}
				isOpen = {isOpen}
				onClose = {onClose}
			>
				<Suspense fallback = {<Loader/>}>
					<DeleteAccountFormAsync
						onClose = {onClose}
					/>
				</Suspense>
			</Modal>
		</DynamicModuleLoader>
	)
}