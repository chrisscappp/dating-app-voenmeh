import type { Meta, StoryObj } from "@storybook/react"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator"
import { SwippedButtons } from "./SwippedButtons"

const meta: Meta<typeof SwippedButtons> = {
	title: "entity/SwippedButtons",
	component: SwippedButtons,
}

export default meta
type Story = StoryObj<typeof SwippedButtons>;


export const SwippedButtonsForAnketCard: Story = {
	args: {
		mountQuestion: true,
		mountCross: true,
		mountLike: true,
		mountWrong: true
	},
	decorators: [StoreDecorator({
		interactAnkets: {}
	})]
}

export const SwippedButtonsForAnketCardDark: Story = {
	args: {
		mountQuestion: true,
		mountCross: true,
		mountLike: true,
		mountWrong: true
	},
	decorators: [StoreDecorator({
		interactAnkets: {}
	}), ThemeDecorator(Themes.DARK)]
}

export const SwippedButtonsForLikedAnket: Story = {
	args: {
		mountQuestion: true,
		mountCross: true,
	},
	decorators: [StoreDecorator({
		interactAnkets: {}
	})]
}

export const SwippedButtonsForSymphatyAnket: Story = {
	args: {
		mountQuestion: true,
		mountCross: true,
		mountLike: true,
		mountWrong: true
	},
	decorators: [StoreDecorator({
		interactAnkets: {}
	})]
}

export const SwippedButtonsForFriendAnket: Story = {
	args: {
		mountQuestion: true,
		mountCross: false,
		mountTelegram: true,
		mountVK: true
	},
	decorators: [StoreDecorator({
		interactAnkets: {}
	})]
}
