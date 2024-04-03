import React, { Suspense } from "react"
import { I18nextProvider } from "react-i18next"
import i18n from "../../i18nConfig/i18nForTests"
import { Decorator, StoryFn } from "@storybook/react"

export const TranslateDecorator = (): Decorator => (Story: StoryFn) => {
	return (
		
		<I18nextProvider i18n={i18n}>
			<Suspense fallback={<h3></h3>}>
				<Story />
			</Suspense>
		</I18nextProvider>
	)
}