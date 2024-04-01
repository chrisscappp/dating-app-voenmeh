import type { StorybookConfig } from "@storybook/react-webpack5";
import * as cn from "./webpack.config"

const config: StorybookConfig = {
  stories: [
	"../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
	builder: "@storybook/builder-webpack5"
  }
};
export default config;
