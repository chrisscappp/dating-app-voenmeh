import type { Meta, StoryObj } from "@storybook/react"
import DeleteAccountForm from "./DeleteAccountForm"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator"

const meta: Meta<typeof DeleteAccountForm> = {
	title: "feature/DeleteAccountForm",
	component: DeleteAccountForm,
}

export default meta
type Story = StoryObj<typeof DeleteAccountForm>;

export const DeleteAccountFormDefault: Story = {
	args: {},
	decorators: [StoreDecorator({
		deleteAccount: {
			form: {
				password: "pass",
				repeatPassword: "repeatpass"
			}
		}
	})]
}

export const DeleteAccountFormDark: Story = {
	args: {},
	decorators: [StoreDecorator({
		deleteAccount: {
			form: {
				password: "pass",
				repeatPassword: "repeatpass"
			}
		}
	}), ThemeDecorator(Themes.DARK)]
}

export const DeleteAccountFormError: Story = {
	args: {},
	decorators: [StoreDecorator({
		deleteAccount: {
			error: "error"
		}
	})]
}

export const DeleteAccountFormIsLoading: Story = {
	args: {},
	decorators: [StoreDecorator({
		deleteAccount: {
			isLoading: true
		}
	})]
}
