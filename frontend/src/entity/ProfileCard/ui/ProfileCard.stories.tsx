import type { Meta, StoryObj } from "@storybook/react"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { ProfileCard } from "./ProfileCard"
import Default from "../../Anket/ui/AnketCard/default.jpg"
import { Profile } from "../model/types"

const meta: Meta<typeof ProfileCard> = {
	title: "entity/ProfileCard/ProfileCard",
	component: ProfileCard,
}

export default meta
type Story = StoryObj<typeof ProfileCard>;

const infoObj: Profile = {
	about: "about",
	age: 22,
	avatar: Default,
	birthday: "12.12.1212",
	confirm: false,
	contacts: {},
	course: 2,
	faculty: "A",
	firstname: "firstname",
	hobbies: ["piv"],
	interested: ["int"],
	lastname: "lastname",
	sex: "male",
	userId: "sdfgjddsk"
}

export const ProfileCardReadonly: Story = {
	args: {
		data: infoObj,
		readonly: true
	},
}

export const ProfileCardReadonlyDark: Story = {
	args: {
		data: infoObj,
		readonly: true
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}

