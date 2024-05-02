import { classNames } from "shared/lib/classNames/classNames"
import { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { WrongAnketFormAsync } from "../WrongAnketForm/WrongAnketFrom.async"
import { Loader } from "shared/ui/Loader/Loader"

interface WrongAnketModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
	wrongId?: string;
	onDislikeAnket?: () => void;
}

export const WrongAnketModal = (props: WrongAnketModalProps) => {

	const {
		isOpen,
		onClose,
		className,
		wrongId,
		onDislikeAnket
	} = props

	return (
		<Modal 
			className = {classNames("", {}, [className])}
			isOpen = {isOpen}
			onClose = {onClose}
		>
			<Suspense fallback = {<Loader/>}>
				<WrongAnketFormAsync
					wrongId = {wrongId}
					onDislikeAnket = {onDislikeAnket}
					onClose = {onClose}
				/>
			</Suspense>
		</Modal>
	)
}