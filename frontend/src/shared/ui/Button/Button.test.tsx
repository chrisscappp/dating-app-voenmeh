import { Button, ButtonTheme } from "shared/ui/Button/Button" 
import { render, screen } from "@testing-library/react"

describe("test button component", () => {
	test("render button with text", () => {
		render(<Button>TEST</Button>)
		expect(screen.getByText("TEST")).toBeInTheDocument()
	})
	test("render button with class <clear>", () => {
		render(<Button theme = {ButtonTheme.CLEAR}>TEST</Button>)
		expect(screen.getByText("TEST")).toHaveClass("clear")
	})
})