import { Form } from "shared/ui/Form/Form"
import { Modal } from "shared/ui/Modal/Modal"
import cls from "./AvatarDetail.module.scss"

interface AvatarDetailModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void; 
	src?: string;
}

export const AvatarDetailModal = (props: AvatarDetailModalProps) => {

	const {
		isOpen,
		onClose,
		src,
		className
	} = props

	return (
		<Modal
			isOpen = {isOpen}
			onClose = {onClose}
		>
			<Form>
				<img
					className = {cls.avatarDetail}
					src = {src}
					alt = "avatarDetail"
				/>
			</Form>
		</Modal>
	)
}