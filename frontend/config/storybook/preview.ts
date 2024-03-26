import type { Preview } from "@storybook/react";
import { StyleDecorator } from "../../src/shared/config/storybookConfig/styleDecorator/styleDecorator"
import { ThemeDecorator } from "../../src/shared/config/storybookConfig/themeDecorator/themeDecorator"
import { RouterDecorator } from "../../src/shared/config/storybookConfig/routerDecorator/routerDecorator"
import { TranslateDecorator } from "../../src/shared/config/storybookConfig/i18nDecorator/i18nDecorator"
import { Themes } from "../../src/app/providers/ThemeProvider/index"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    }
  },
  decorators: [
    //...i18nDecorators,
	  StyleDecorator,
	  ThemeDecorator(Themes.LIGHT),
	  RouterDecorator,
    TranslateDecorator(),
  ]
};

export default preview;
