import type { Meta, StoryObj } from "@storybook/react"
import MainPage from "./MainPage"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import { TranslateDecorator } from "shared/config/storybookConfig/i18nDecorator/i18nDecorator"
import React from "react"

const meta: Meta<typeof MainPage> = {
	title: "pages/MainPage",
	component: MainPage,
}

export default meta
type Story = StoryObj<typeof MainPage>;

export const MainPageLight: Story = {
	args: {},
}

export const MainPageDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



