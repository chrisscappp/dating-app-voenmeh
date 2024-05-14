import type { Meta, StoryObj } from "@storybook/react"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator"
import { InteractAnketCard } from "./InteractAnketCard"
import { IUser } from "entity/User"

const meta: Meta<typeof InteractAnketCard> = {
	title: "entity/Anket/InteractAnketCard",
	component: InteractAnketCard,
}

export default meta
type Story = StoryObj<typeof InteractAnketCard>;

const infoObj: IUser = {
	userId: "asdsadsadsa",
	about: "about",
	age: 22,
	avatar: "",
	confirm: false,
	email: "milo@vamil.ru",
	firstname: "firstanme",
	lastname: "lasnta",
	login: "abpba"
}

export const InteractAnketCardDefault: Story = {
	args: {
		user: infoObj
	},
	decorators: [StoreDecorator({
		interactAnkets: {}
	})]
}

export const InteractAnketCardDark: Story = {
	args: {
		user: infoObj
	},
	decorators: [StoreDecorator({
		interactAnkets: {}
	}), ThemeDecorator(Themes.DARK)]
}