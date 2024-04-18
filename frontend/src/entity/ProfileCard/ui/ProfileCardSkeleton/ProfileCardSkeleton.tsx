import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import cls from "../ProfileCard.module.scss"

export const ProfileCardSkeleton = () => {
	return (
		<>
			<div className = {cls.header}>
				<div className = {cls.mainInfo}>
					<div className = {cls.avatarWrap}>
						<Skeleton
							height={125}
							width={100}
						/>
					</div>
					<div className = {cls.headerText}>
						<Skeleton
							height={40}
							width={300}
						/>
						<Skeleton
							className = {cls.age}
							height={40}
							width={250}
						/>
					</div>
				</div>
			</div>
			<div className = {cls.body}>
				<div className = {cls.infoBlock}>
					<Skeleton
						height={200}
						width={"100%"}
					/>
				</div>
				<div className = {cls.infoBlock}>
					<Skeleton
						height={200}
						width={"100%"}
					/>
				</div>
			</div>
		</>
	
	)
}