import type { Meta, StoryObj } from "@storybook/react"
import NotificationsForm from "./NotificationsForm"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof NotificationsForm> = {
	title: "feature/NotificationsForm",
	component: NotificationsForm,
}

export default meta
type Story = StoryObj<typeof NotificationsForm>;

export const DefaultNotificationsForm: Story = {
	args: {
		notifications: [{message: "asdas", notificationId: 1}]
	},
}

export const DefaultNotificationsFormDark: Story = {
	args: {
		notifications: [{message: "asdfds", notificationId: 2}]
	},
	decorators: [
		ThemeDecorator(Themes.DARK)
	]
}

export const NotificationsFormError: Story = {
	args: {
		error: "error"
	},
}

export const NotificationsFormIsLoading: Story = {
	args: {
		isLoading: true
	},
}