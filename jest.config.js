module.exports = {
	roots: [
		"<rootDir>/src"
	],
	globalSetup: "<rootDir>/src/tests/config/setUp.js",
	testMatch: [
		"**/tests/*.test.+(ts|tsx|js)",
	],
}