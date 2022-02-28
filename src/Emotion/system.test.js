import {
	getThemeCSSVars,
	isValidThemeValue,
	getStylePropCssVar,
} from "./system";

describe("system.js tests", () => {
	it("should test creating the css vars", () => {
		const results = getThemeCSSVars();
	});

	it("should validate theme value key", () => {
		const resultOne = isValidThemeValue("space", 24);
	});

	it("should convert covert {mb: '36'} to {marginBottom: var(--rh-space-36)'}", () => {
		const result = getStylePropCssVar("mb", "36");
		expect(result).toStrictEqual(["marginBottom", "var(--rh-space-36)"]);
	});

	describe("getStylePropCssVar happy path", () => {
		it.each([
			["mb", "36", ["marginBottom", "var(--rh-space-36)"]],
			["mb", "52", ["marginBottom", "var(--rh-space-52)"]],
			["mt", "52", ["marginTop", "var(--rh-space-52)"]],
			["marginTop", "1.5", ["marginTop", "var(--rh-space-1_5)"]],
			["m", "16", ["margin", "var(--rh-space-16)"]],
			["color", "red", ["color", "var(--rh-colors-red)"]],
			["color", "sprk.black.70", ["color", "var(--rh-colors-sprk_black_70)"]],
		])(`should map key %s and value %s to %s`, (propKey, propValue, output) => {
			const result = getStylePropCssVar(propKey, propValue);
			expect(result).toStrictEqual(output);
		});
	});
});
