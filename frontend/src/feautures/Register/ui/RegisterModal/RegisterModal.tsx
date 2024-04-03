import { classNames } from "shared/lib/classNames/classNames"
import React, { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { RegisterFormAsync } from "../RegisterForm/RegisterForm.async"
import { Loader } from "shared/ui/Loader/Loader"

interface RegisterModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const RegisterModal = ({ className, isOpen, onClose }: RegisterModalProps) => {

	return (
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
	)
}