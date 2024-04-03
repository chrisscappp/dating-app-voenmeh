import { BuildOptions } from "./types/config"
import webpack from "webpack"
import buildPlugins from "./buildPlugins"
import buildLoaders from "./buildLoaders"
import buildResolvers from "./buildResolvers"
import { buildDevServer } from "./buildDevServer"

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
	const { mode, paths, isDev } = options 
	
	return {
		mode: mode,
		entry: paths.entry, //стартовая точка приложения
		module: {
			rules: buildLoaders(options)  // конфигурация лоадеров - обработчиков файлов, выходящих за рамки жс
		},
		resolve: buildResolvers(options),
		output: {
			filename: "[name].[contenthash].js",
			path: paths.build,
			clean: true,
			publicPath: "/"
		}, // куда и как делаем сборку приложения
		plugins: buildPlugins(options), // плагины для работы вебпак
		devtool: isDev ? "inline-source-map" : undefined,
		//@ts-ignore
		devServer: buildDevServer(options)
	}
}