import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Themes } from "app/providers/ThemeProvider";

const meta: Meta<typeof Select> = {
	title: "shared/Select",
  	component: Select,
	args: {}
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
	{value: "1", content: "Первый пункт"},
	{value: "2", content: "Второй пункт"},
	{value: "3", content: "Третий пункт"},
]

export const SelectPrimary: Story = {
	args: {
		label: "Text",
		options: options
	},
};

export const SelectDark: Story = {
	args: {
		label: "Text",
		options: options
	},
	decorators: ThemeDecorator(Themes.DARK)
};