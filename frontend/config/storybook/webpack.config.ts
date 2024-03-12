import webpack from "webpack"
import { BuildPaths } from "../build/types/config"
//@ts-ignore
import path from "path"
import { buildCssLoader } from "../build/loaders/buildCssLoader"
import { buildSvgLoader } from "../build/loaders/buildSvgLoader"

//const __dirname = path.resolve(path.dirname(''));

export default ({config}: {config: webpack.Configuration}) => {
	const paths: BuildPaths = {
		build: "",
		entry: "",
		html: "",
		src: path.resolve(__dirname, "..", "..", "src")
	}

	config!.resolve!.modules!.push(paths.src)
	config!.resolve!.extensions!.push('.ts', '.tsx')

	config!.module!.rules = config!.module!.rules!.map((rule: any) => {
		if (/svg/.test(rule.test as string)) {
			return {...rule, exclude: /\.svg$/i}
		}
		return rule
	})
	config!.module!.rules.push(buildSvgLoader())
	config!.module!.rules.push(buildCssLoader(true))
	
	config!.plugins!.push(new webpack.DefinePlugin({
		__IS_DEV__: JSON.stringify(true),
		__API__: JSON.stringify("")
	}))
	
	return config
}