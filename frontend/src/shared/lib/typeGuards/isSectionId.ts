export function isSectionId(section: string | undefined): section is string {
	return typeof section === "string"
}