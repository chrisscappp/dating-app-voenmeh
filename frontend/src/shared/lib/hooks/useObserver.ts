import { MutableRefObject, useEffect } from "react"

export interface UseObserverOptions {
	callback?: () => void;
	triggerRef: MutableRefObject<Element>;
	wrapperRef: MutableRefObject<HTMLElement>;
}

export function useObserver({ callback, triggerRef, wrapperRef }: UseObserverOptions) {

	useEffect(() => {
		// eslint-disable-next-line prefer-const
		let observer: IntersectionObserver | null = null
		if (callback) {
			const options = {
				root: wrapperRef.current,
				rootMargin: "0px",
				threshHold: 1.0
			}

			observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					console.log("intersected")
					callback()
				}		
			}, options)
			observer.observe(triggerRef.current)
			
		}

		// return () => {
		// 	if (observer) {
		// 		// eslint-disable-next-line react-hooks/exhaustive-deps
		// 		observer.unobserve(triggerRef.current as Element)
		// 	}
		// }
	}, [callback, triggerRef, wrapperRef])
}