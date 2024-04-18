import type { Meta, StoryObj } from "@storybook/react"
import { PageError } from "./PageError"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof PageError> = {
	title: "widgets/PageError",
	component: PageError,
}

export default meta
type Story = StoryObj<typeof PageError>;

export const PageErrorLight: Story = {
	args: {},
}

export const PageErrorDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



