import type { Meta, StoryObj } from "@storybook/react"
import { Button, ButtonTheme } from './Button';
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";
import React from "react";

const meta: Meta<typeof Button> = {
	title: "shared/Button",
  	component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const BackgroundBtn: Story = {
	args: {
		children: "Text",
		style: {
			margin: "20px"
		},
		theme: ButtonTheme.BACKGROUND
	},
};

export const BackgroundInvertedTextBtn: Story = {
	args: {
		children: "Text",
		style: {
			margin: "20px"
		},
		theme: ButtonTheme.BACKGROUND_INVERTED_TEXT
	},
};

export const BackgroundBtnDark: Story = {
	args: {
		children: "Text",
		style: {
			margin: "20px"
		},
		theme: ButtonTheme.BACKGROUND_INVERTED
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const ClearBtn: Story = {
	args: {
		children: "Text",
		style: {
			margin: "20px"
		},
		theme: ButtonTheme.CLEAR_INVERTED
	},
};

export const ClearBtnDark: Story = {
	args: {
		children: "Text",
		style: {
			margin: "20px"
		},
		theme: ButtonTheme.CLEAR_INVERTED
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const ErrorBtn: Story = {
	args: {
		children: "Text",
		style: {
			margin: "20px"
		},
		theme: ButtonTheme.ERROR
	},
};

export const ErrorBtnDark: Story = {
	args: {
		children: "Text",
		style: {
			margin: "20px"
		},
		theme: ButtonTheme.ERROR
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const OutlineBtn: Story = {
	args: {
		children: "Text",
		style: {
			margin: "20px"
		},
		theme: ButtonTheme.OUTLINE
	},
};

export const OutlineBtnDark: Story = {
	args: {
		children: "Text",
		style: {
			margin: "20px"
		},
		theme: ButtonTheme.OUTLINE_INVERTED
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const OutlineInvertedBtn: Story = {
	args: {
		children: "Text",
		style: {
			margin: "20px"
		},
		theme: ButtonTheme.OUTLINE_INVERTED
	},
};

