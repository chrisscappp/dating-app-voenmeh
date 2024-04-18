import type { Meta, StoryObj } from "@storybook/react"
import { PageLoader } from "./PageLoader"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof PageLoader> = {
	title: "widgets/PageLoader",
	component: PageLoader,
}

export default meta
type Story = StoryObj<typeof PageLoader>;

export const PageErrorLight: Story = {
	args: {},
}

export const PageErrorDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



