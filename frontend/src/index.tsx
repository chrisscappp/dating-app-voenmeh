import App from "app/App"
import { ThemeProvider } from "app/providers/ThemeProvider"
import "shared/config/i18nConfig/i18n"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "app/providers/ErrorBoundary"
import { StoreProvider } from "app/providers/StoreProvider"

//@ts-ignore
createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<StoreProvider>
			<ErrorBoundary>
				<ThemeProvider>
					<App/>
				</ThemeProvider>
			</ErrorBoundary>	
		</StoreProvider>
	</BrowserRouter>
)
