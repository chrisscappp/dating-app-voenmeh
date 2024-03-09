export type BuildMode = "production" | "development"

export interface BuildPaths {
	entry: string; // точка входа
	build: string; // путь до сборки
	html: string; // путь до html файла
	src: string;
}

export interface BuildEnv {
	mode: BuildMode,
	port: number
}

export interface BuildOptions {
	mode: BuildMode,
	paths: BuildPaths,
	isDev: boolean,
	port: number,
}