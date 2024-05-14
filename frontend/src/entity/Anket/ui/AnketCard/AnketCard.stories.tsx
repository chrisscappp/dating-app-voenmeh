import type { Meta, StoryObj } from "@storybook/react"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator"
import { AnketCard } from "./AnketCard"
import Default from "./default.jpg"
import { IUser } from "entity/User"

const meta: Meta<typeof AnketCard> = {
	title: "entity/Anket/AnketCard",
	component: AnketCard,
}

export default meta
type Story = StoryObj<typeof AnketCard>;

const infoObj: IUser = {
	userId: "asdsadsadsa",
	about: "about",
	age: 22,
	avatar: Default,
	confirm: false,
	email: "milo@vamil.ru",
	firstname: "firstanme",
	lastname: "lasnta",
	login: "abpba"
}

export const AnketCardDefault: Story = {
	args: {
		user: infoObj
	},
}

export const AnketCardDark: Story = {
	args: {
		user: infoObj
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}

export const AnketCardDefaultConfirmed: Story = {
	args: {
		user: {...infoObj, confirm: true}
	},
}