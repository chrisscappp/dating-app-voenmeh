import type { Meta, StoryObj } from "@storybook/react"
import AboutPage from "./AboutPage"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof AboutPage> = {
	title: "pages/AboutPage",
	component: AboutPage,
}

export default meta
type Story = StoryObj<typeof AboutPage>;

export const AboutPageLight: Story = {
	args: {},
	decorators: []
}

export const AboutPageDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



