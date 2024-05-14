import type { Meta, StoryObj } from "@storybook/react"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator"
import WrongAnketForm from "./WrongAnketForm"

const meta: Meta<typeof WrongAnketForm> = {
	title: "feature/WrongAnketForm",
	component: WrongAnketForm,
}

export default meta
type Story = StoryObj<typeof WrongAnketForm>;

export const WrongAnketFormDefault: Story = {
	args: {},
	decorators: [StoreDecorator({
		wrongAnket: {
			message: "message"
		}
	})]
}

export const WrongAnketFormDark: Story = {
	args: {},
	decorators: [StoreDecorator({
		wrongAnket: {
			message: "message"
		}
	}), ThemeDecorator(Themes.DARK)]
}

export const WrongAnketFormError: Story = {
	args: {},
	decorators: [StoreDecorator({
		wrongAnket: {
			error: "error"
		}
	})]
}

export const WrongAnketFormErrorDark: Story = {
	args: {},
	decorators: [StoreDecorator({
		wrongAnket: {
			error: "error"
		}
	}), ThemeDecorator(Themes.DARK)]
}

export const WrongAnketFormIsLoading: Story = {
	args: {},
	decorators: [StoreDecorator({
		wrongAnket: {
			isLoading: true
		}
	})]
}