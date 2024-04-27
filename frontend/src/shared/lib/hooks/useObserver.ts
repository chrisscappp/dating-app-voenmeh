import { MutableRefObject, useEffect, useRef } from "react"

export interface UseObserverOptions {
	callback?: () => void;
	triggerRef: MutableRefObject<HTMLElement>;
	wrapperRef: MutableRefObject<HTMLElement>;
}

export function useObserver({ callback, triggerRef, wrapperRef }: UseObserverOptions) {
	const observer = useRef<IntersectionObserver | null>(null)

	useEffect(() => {
		//let observer: IntersectionObserver | null = null
		if (callback) {
			const options = {
				root: wrapperRef.current,
				rootMargin: "0px",
				threshHold: 1.0
			}

			observer.current = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					console.log("intersected")
					callback()
				}		
			}, options)

			observer.current.observe(triggerRef.current)
		}

		return () => {
			if (observer.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.current.unobserve(triggerRef.current)
			}
		}
	}, [callback, triggerRef, wrapperRef])
}