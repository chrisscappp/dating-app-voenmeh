import { classNames } from "shared/lib/classNames/classNames" 

describe("classNames", () => {
	test("classname with main class", () => {
		const expected = "classname"
		expect(classNames("classname")).toBe(expected)
	})
	test("classname with main class and mods", () => {
		const expected = "classname hovered"
		expect(classNames("classname", {hovered: true})).toBe(expected)
	})
	test("classname with main class and additional", () => {
		const expected = "classname size"
		expect(classNames("classname", {}, ["size"])).toBe(expected)
	})
	test("classname with main class, mods and additional", () => {
		const expected = "classname size hovered"
		expect(classNames("classname", {hovered: true}, ["size"])).toBe(expected)
	})
	test("classname empty", () => {
		const expected = ""
		expect(classNames("", {}, [])).toBe(expected)
	})
})