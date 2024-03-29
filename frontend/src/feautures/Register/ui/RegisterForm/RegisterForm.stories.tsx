import type { Meta, StoryObj } from "@storybook/react"
import RegisterForm from './RegisterForm';
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";
import React from "react";
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator";
import { Sex } from "entities/SelectSex";

const meta: Meta<typeof RegisterForm> = {
	title: "feature/RegisterForm",
  	component: RegisterForm,
};

export default meta;
type Story = StoryObj<typeof RegisterForm>;

export const DefaultRegisterForm: Story = {
	args: {
		
	},
	decorators: [StoreDecorator({
		registerForm: {
			formData: {
				firstname: "A",
				lastname: "B",
				username: "C",
				birthday: "31.02.2000",
				password: "1",
				repeatPassword: "2",
				sex: Sex.FEMALE
			}
		}
	})]
};

export const DefaultRegisterFormDark: Story = {
	args: {
		
	},
	decorators: [
		StoreDecorator({
			registerForm: {
				formData: {
					firstname: "A",
					lastname: "B",
					username: "C",
					birthday: "31.02.2000",
					password: "1",
					repeatPassword: "2",
					sex: Sex.FEMALE
				}
			}
		}),
		ThemeDecorator(Themes.DARK)
	]
};

export const RegisterFormError: Story = {
	args: {
		
	},
	decorators: [StoreDecorator({
		registerForm: {
			error: "erorr"
		}
	})]
};

export const RegisterFormIsLoading: Story = {
	args: {
		
	},
	decorators: [StoreDecorator({
		registerForm: {
			isLoading: true
		}
	})]
};