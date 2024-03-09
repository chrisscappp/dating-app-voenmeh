import { BuildOptions } from "./types/config";
//import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export function buildDevServer(options: BuildOptions): any {
	return {
		port: options.port,
		open: true,
		historyApiFallback: true // для перехода между страницами
	}
}