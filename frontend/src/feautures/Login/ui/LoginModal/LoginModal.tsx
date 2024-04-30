import { classNames } from "shared/lib/classNames/classNames"
import { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { LoginFormAsync } from "../LoginForm/LoginForm.async"
import { Loader } from "shared/ui/Loader/Loader"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { loginFormReducer } from "../../model/slice/loginSlice"

interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

const initialReducers: ReducersList = {
	loginForm: loginFormReducer
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
			<Modal 
				className = {classNames("", {}, [className])}
				isOpen = {isOpen}
				onClose = {onClose}
			>
				<Suspense fallback = {<Loader/>}>
					<LoginFormAsync
						onSuccess = {onClose}
					/>
				</Suspense>
			</Modal>
		</DynamicModuleLoader>
	)
}