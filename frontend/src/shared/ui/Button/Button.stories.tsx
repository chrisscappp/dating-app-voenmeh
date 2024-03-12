import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonTheme } from './Button';
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";

const meta: Meta<typeof Button> = {
	title: "shared/Button",
  	component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: "Text",
	},
};

export const Clear: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.CLEAR
	},
};
