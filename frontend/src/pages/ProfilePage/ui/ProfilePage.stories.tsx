import type { Meta, StoryObj } from "@storybook/react"
import ProfilePage from "./ProfilePage"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof ProfilePage> = {
	title: "pages/ProfilePage",
	component: ProfilePage,
}

export default meta
type Story = StoryObj<typeof ProfilePage>;

export const ProfilePageLight: Story = {
	args: {},
	decorators: []
}

export const ProfilePageDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



