import App from "app/App";
import { ThemeProvider } from "app/providers/ThemeProvider";
import "shared/config/i18nConfig/i18n"
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<ThemeProvider>
			<App/>
		</ThemeProvider>
	</BrowserRouter>
)
