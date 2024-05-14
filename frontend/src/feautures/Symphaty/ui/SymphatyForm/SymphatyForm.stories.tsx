import type { Meta, StoryObj } from "@storybook/react"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator"
import SymphatyForm from "./SymphatyForm"
import { IUser } from "entity/User"
import Default from "./default.jpg"

const meta: Meta<typeof SymphatyForm> = {
	title: "feature/SymphatyForm",
	component: SymphatyForm,
}

export default meta
type Story = StoryObj<typeof SymphatyForm>;

const infoObj: IUser = {
	about: "aboyut",
	age: 22,
	avatar: Default,
	confirm: true,
	firstname: "asdadas",
	lastname: "lasnmae",
	userId: "asdsadhbsahbdbhjsbhjdbhj"
}

export const SymphatyFormDefault: Story = {
	args: {},
	decorators: [StoreDecorator({
		interactAnkets: {
			likedAnket: infoObj
		}
	})]
}

export const SymphatyFormDark: Story = {
	args: {},
	decorators: [StoreDecorator({
		interactAnkets: {
			likedAnket: infoObj
		}
	}), ThemeDecorator(Themes.DARK)]
}
