import { Decorator, StoryFn } from "@storybook/react"
import { Themes } from "app/providers/ThemeProvider";
import { ThemeProvider } from "app/providers/ThemeProvider/index"

export const ThemeDecorator = (theme: Themes): Decorator => (StoryComponent: StoryFn)  => {
	return (
		<ThemeProvider
			initialTheme = {theme}
		>
			<div className = {`app ${theme}`}>
				<StoryComponent/>
			</div>
		</ThemeProvider>
	)
};