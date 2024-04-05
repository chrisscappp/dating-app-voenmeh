import { classNames } from "shared/lib/classNames/classNames"
import React, { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { RegisterFormAsync } from "../RegisterForm/RegisterForm.async"
import { Loader } from "shared/ui/Loader/Loader"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { registerFormReducer } from "../../model/slice/registerSlice"

interface RegisterModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

const initialReducers: ReducersList = {
	registerForm: registerFormReducer
}

export const RegisterModal = ({ className, isOpen, onClose }: RegisterModalProps) => {

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
			<Modal 
				className = {classNames("", {}, [className])}
				isOpen = {isOpen}
				onClose = {onClose}
			>
				<Suspense fallback = {<Loader/>}>
					<RegisterFormAsync
						onSuccess = {onClose}
					/>
				</Suspense>
			</Modal>
		</DynamicModuleLoader>
		
	)
}