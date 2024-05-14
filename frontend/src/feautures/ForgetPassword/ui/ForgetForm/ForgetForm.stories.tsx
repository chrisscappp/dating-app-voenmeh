import type { Meta, StoryObj } from "@storybook/react"
import ForgetForm from "./ForgetForm"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator"

const meta: Meta<typeof ForgetForm> = {
	title: "feature/ForgetForm",
	component: ForgetForm,
}

export default meta
type Story = StoryObj<typeof ForgetForm>;

export const ForgetFormDefault: Story = {
	args: {
		onMountForget: () => {return 1}
	},
	decorators: [StoreDecorator({
		forgetPassword: {
			email: "email"
		}
	})]
}

export const ForgetFormDefaultDark: Story = {
	args: {
		onMountForget: () => {return 1}
	},
	decorators: [StoreDecorator({
		forgetPassword: {
			email: "email"
		}
	}), ThemeDecorator(Themes.DARK)]
}

export const ForgetFormDefaultError: Story = {
	args: {
		onMountForget: () => {return 1}
	},
	decorators: [StoreDecorator({
		forgetPassword: {
			error: "error"
		}
	})]
}

export const ForgetFormDefaultErrorDark: Story = {
	args: {
		onMountForget: () => {return 1}
	},
	decorators: [StoreDecorator({
		forgetPassword: {
			error: "error"
		}
	}), ThemeDecorator(Themes.DARK)]
}

export const ForgetFormDefaultMessage: Story = {
	args: {
		onMountForget: () => {return 1}
	},
	decorators: [StoreDecorator({
		forgetPassword: {
			message: "message"
		}
	})]
}

export const ForgetFormDefaultMessageDark: Story = {
	args: {
		onMountForget: () => {return 1}
	},
	decorators: [StoreDecorator({
		forgetPassword: {
			message: "message"
		}
	}), ThemeDecorator(Themes.DARK)]
}