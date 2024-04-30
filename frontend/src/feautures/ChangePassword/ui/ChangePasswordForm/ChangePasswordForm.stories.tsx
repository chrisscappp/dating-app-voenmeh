import type { Meta, StoryObj } from "@storybook/react"
import ChangePasswordForm from "./ChangePasswordForm"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator"

const meta: Meta<typeof ChangePasswordForm> = {
	title: "feature/ChangePasswordForm",
	component: ChangePasswordForm,
}

export default meta
type Story = StoryObj<typeof ChangePasswordForm>;

export const DefaultChangePasswordForm: Story = {
	args: {
		
	},
	decorators: [StoreDecorator({
		changePassword: {
			form: {
				password: "12345"
			}
		}
	})]
}

export const DefaultChangePasswordFormDark: Story = {
	args: {
		
	},
	decorators: [
		StoreDecorator({
			changePassword: {
				form: {
					password: "12345"
				}
			}
		}),
		ThemeDecorator(Themes.DARK)
	]
}

export const ChangePasswordFormError: Story = {
	args: {
		
	},
	decorators: [StoreDecorator({
		changePassword: {
			error: "Error"
		}
	})]
}

export const ChangePasswordFormIsLoading: Story = {
	args: {
		
	},
	decorators: [StoreDecorator({
		changePassword: {
			isLoading: true
		}
	})]
}