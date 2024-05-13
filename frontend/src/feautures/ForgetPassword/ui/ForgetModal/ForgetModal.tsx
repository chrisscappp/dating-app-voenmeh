import { ForgetFormAsync } from "../ForgetForm/ForgetForm.async"
import { classNames } from "shared/lib/classNames/classNames"
import { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { Loader } from "shared/ui/Loader/Loader"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { forgetPasswordReducer } from "../../modal/slice/forgetPasswordSlice"

interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
	onMountForget: () => void;
	onDismountForget: () => void;
}

const initialReducers: ReducersList = {
	forgetPassword: forgetPasswordReducer
}

export const ForgetModal = (props: LoginModalProps) => {

	const {
		isOpen,
		onClose,
		onDismountForget,
		onMountForget,
		className
	} = props

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
			<Modal 
				className = {classNames("", {}, [className])}
				isOpen = {isOpen}
				onClose = {onClose}
			>
				<Suspense fallback = {<Loader/>}>
					<ForgetFormAsync
						onMountForget = {onMountForget}
						onDismountForget = {onDismountForget}
					/>
				</Suspense>
			</Modal>
		</DynamicModuleLoader>
	)
}