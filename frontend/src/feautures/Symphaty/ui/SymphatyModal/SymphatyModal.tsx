import { classNames } from "shared/lib/classNames/classNames"
import { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { Loader } from "shared/ui/Loader/Loader"
import { SymphatyFormAsync } from "../SymphatyForm/SymphatyForm.async"

interface SymphatyModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const SymphatyModal = ({ className, isOpen, onClose }: SymphatyModalProps) => {

	return (
		<Modal 
			className = {classNames("", {}, [className])}
			isOpen = {isOpen}
			onClose = {onClose}
		>
			<Suspense fallback = {<Loader/>}>
				<SymphatyFormAsync/>
			</Suspense>
		</Modal>	
	)
}