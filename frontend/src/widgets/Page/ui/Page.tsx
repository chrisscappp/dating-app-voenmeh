import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Page.module.scss"
import React, { ReactNode } from "react"

interface PageProps {
	className?: string;
	children: ReactNode;
}

export const Page = (props: PageProps) => {

	const { children, className } = props

	return (
		<section 
			className = {classNames(cls.Page, {}, [className])}
		>
			{children}	
		</section>
	)
}
