import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

//const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

export default function buildPlugins({paths, isDev}: BuildOptions): webpack.WebpackPluginInstance[] {

	const plugins = [
		new HtmlWebpackPlugin({
			template: paths.html // теперь будет браться шаблон этого файла
		}),
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css'
		}),
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev)
		}), // глобальная переменная
	]

	if (isDev) {
		//plugins.push(new ReactRefreshWebpackPlugin())
		plugins.push(new BundleAnalyzerPlugin({
			openAnalyzer: false
		}))
	}

	return plugins
} // функция вернёт плагины для webpack