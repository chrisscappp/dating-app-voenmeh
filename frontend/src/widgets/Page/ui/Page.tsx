import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Page.module.scss"
import React, { MutableRefObject, ReactNode, useRef } from "react"
import { useObserver } from "shared/lib/hooks/useObserver"
import { useInView } from "react-intersection-observer"

interface PageProps {
	className?: string;
	children: ReactNode
}

export const Page = (props: PageProps) => {

	const { children, className } = props

	// const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
	// const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

	// useObserver({
	// 	callback: () => console.log("callback"),
	// 	triggerRef,
	// 	wrapperRef
	// })

	const { ref, inView, entry } = useInView({
		/* Optional options */
		threshold: 0,
	})

	if (inView) {
		console.log("INVIEW", inView)
	}

	return (
		<section 
			className = {classNames(cls.Page, {}, [className])}
		>
			{children}	
			<div ref = {ref}/>		
		</section>
	)
}
