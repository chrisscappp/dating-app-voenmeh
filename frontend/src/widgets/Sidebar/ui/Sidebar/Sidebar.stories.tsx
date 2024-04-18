import type { Meta, StoryObj } from "@storybook/react"
import { Sidebar } from "./Sidebar"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator"

const meta: Meta<typeof Sidebar> = {
	title: "widgets/Sidebar",
	component: Sidebar,
}

export default meta
type Story = StoryObj<typeof Sidebar>;

export const SidebarLight: Story = {
	args: {},
	decorators: [StoreDecorator({})]
}

export const SidebarDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK), StoreDecorator({})]
}



