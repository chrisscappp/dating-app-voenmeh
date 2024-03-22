import type { Preview } from "@storybook/react";
import { StyleDecorator } from "../../src/shared/config/storybookConfig/styleDecorator/styleDecorator"
import { ThemeDecorator } from "../../src/shared/config/storybookConfig/themeDecorator/themeDecorator"
import { RouterDecorator } from "../../src/shared/config/storybookConfig/routerDecorator/routerDecorator"
import { TranslateDecorator } from "../../src/shared/config/storybookConfig/i18nDecorator/i18nDecorator"
import { Themes } from "../../src/app/providers/ThemeProvider/index"
import type { Renderer, ProjectAnnotations } from '@storybook/types';
import i18n from 'storybook-i18n/preview';

//@ts-ignore
const i18nDecorators = i18n?.decorators || [];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    ...i18nDecorators,
	  StyleDecorator,
	  ThemeDecorator(Themes.LIGHT),
	  RouterDecorator,
    TranslateDecorator()
  ]
};

export default preview;
