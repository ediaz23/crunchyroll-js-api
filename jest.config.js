
export default {
    roots: [
        '<rootDir>/'
    ],
    testEnvironment: 'node',
    globalSetup: '<rootDir>/tests/config/setUp.js',
    testMatch: [
        '**/tests/*.test.+(ts|tsx|js)',
    ],
    transformIgnorePatterns: ['/node_modules'],
}
