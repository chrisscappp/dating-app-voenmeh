import type { Meta, StoryObj } from "@storybook/react"
import { EditableProfileCard } from "./EditableProfileCard"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator"
import { Profile } from "entity/ProfileCard"

const meta: Meta<typeof EditableProfileCard> = {
	title: "feature/EditableProfileCard",
	component: EditableProfileCard,
}

export default meta
type Story = StoryObj<typeof EditableProfileCard>;

const infoObj: Profile = {
	about: "about",
	age: 19,
	birthday: "12.12.1212",
	confirm: true,
	contacts: {},
	course: 2,
	faculty: "",
	firstname: "firstanme",
	lastname: "lastname",
	sex: "male"
}

export const EditableProfileCardDefaultReadonly: Story = {
	args: {},
	decorators: [StoreDecorator({
		editableProfile: {
			data: infoObj,
			form: infoObj,
			readonly: true
		}
	})]
}

export const EditableProfileCardDefaultReadonlyDark: Story = {
	args: {},
	decorators: [StoreDecorator({
		editableProfile: {
			data: infoObj,
			form: infoObj,
			readonly: true
		}
	}), ThemeDecorator(Themes.DARK)]
}

export const EditableProfileCardDefaultNotConfirmed: Story = {
	args: {},
	decorators: [StoreDecorator({
		editableProfile: {
			data: {...infoObj, confirm: false},
			form: {...infoObj, confirm: false},
			readonly: true
		}
	})]
}

export const EditableProfileCardDefault: Story = {
	args: {},
	decorators: [StoreDecorator({
		editableProfile: {
			data: infoObj,
			form: infoObj,
		}
	})]
}

export const EditableProfileCardDefaultDark: Story = {
	args: {},
	decorators: [StoreDecorator({
		editableProfile: {
			data: infoObj,
			form: infoObj,
		}
	}), ThemeDecorator(Themes.DARK)]
}
