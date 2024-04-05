import webpack from "webpack"
import { BuildPaths } from "../build/types/config"
import path from "path"
import { buildCssLoader } from "../build/loaders/buildCssLoader"
import { buildSvgLoader } from "../build/loaders/buildSvgLoader"
import { buildBabelLoader } from "../build/loaders/buildBabelLoader"

export default ({config}: {config: webpack.Configuration}) => {
	const paths: BuildPaths = {
		build: "",
		entry: "",
		html: "",
		//@ts-ignore
		src: path.resolve(__dirname, "..", "..", "src")
	}

	//config!.output!.publicPath = "/"

	config!.resolve!.modules!.push(paths.src)
	config!.resolve!.extensions!.push(".ts", ".tsx")
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	config!.module!.rules = config!.module!.rules!.map((rule: any) => {
		if (/svg/.test(rule.test as string)) {
			return {...rule, exclude: /\.svg$/i}
		}
		return rule
	})
	config!.module!.rules.push(buildBabelLoader())
	config!.module!.rules.push(buildSvgLoader())
	config!.module!.rules.push(buildCssLoader(true))
	
	config!.plugins!.push(new webpack.DefinePlugin({
		__IS_DEV__: JSON.stringify(true),
		__API__: JSON.stringify("")
	}))
	
	return config
}