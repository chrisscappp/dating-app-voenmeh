import type { Meta, StoryObj } from "@storybook/react"
import LoginForm from "./LoginForm"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator"

const meta: Meta<typeof LoginForm> = {
	title: "feature/LoginForm",
	component: LoginForm,
}

export default meta
type Story = StoryObj<typeof LoginForm>;

export const DefaultLoginForm: Story = {
	args: {
		
	},
	decorators: [StoreDecorator({
		loginForm: {
			username: "A",
			password: "B"
		}
	})]
}

export const DefaultLoginFormDark: Story = {
	args: {
		
	},
	decorators: [
		StoreDecorator({
			loginForm: {
				username: "A",
				password: "B"
			}
		}),
		ThemeDecorator(Themes.DARK)
	]
}

export const LoginFormError: Story = {
	args: {
		
	},
	decorators: [StoreDecorator({
		loginForm: {
			error: "erorr"
		}
	})]
}

export const LoginFormIsLoading: Story = {
	args: {
		
	},
	decorators: [StoreDecorator({
		loginForm: {
			isLoading: true
		}
	})]
}