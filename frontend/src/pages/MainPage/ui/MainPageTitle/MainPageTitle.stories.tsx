import type { Meta, StoryObj } from "@storybook/react"
import { MainPageTitle } from "./MainPageTitle"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import { TranslateDecorator } from "shared/config/storybookConfig/i18nDecorator/i18nDecorator"
import React from "react"

const meta: Meta<typeof MainPageTitle> = {
	title: "pages/MainPageTitle",
	component: MainPageTitle,
}

export default meta
type Story = StoryObj<typeof MainPageTitle>;

export const MainPageTitleLight: Story = {
	args: {},
}

export const MainPageTitleDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



