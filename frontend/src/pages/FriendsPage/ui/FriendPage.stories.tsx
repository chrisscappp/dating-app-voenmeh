import type { Meta, StoryObj } from "@storybook/react"
import FriendsPage from "./FriendsPage"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof FriendsPage> = {
	title: "pages/FriendsPage",
	component: FriendsPage,
}

export default meta
type Story = StoryObj<typeof FriendsPage>;

export const FriendsPageLight: Story = {
	args: {},
	decorators: []
}

export const FriendsPageDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



