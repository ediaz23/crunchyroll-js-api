module.exports = {
	roots: [
		"<rootDir>/"
	],
	globalSetup: "<rootDir>/tests/config/setUp.js",
	testMatch: [
		"**/tests/*.test.+(ts|tsx|js)",
	],
}