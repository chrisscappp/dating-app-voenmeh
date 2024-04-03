import { BuildOptions } from "./types/config"
//import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildDevServer(options: BuildOptions): any {
	return {
		port: options.port,
		open: true,
		historyApiFallback: true, // для перехода между страницами
	}
}