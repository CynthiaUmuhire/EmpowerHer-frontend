export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
    roots: ['<rootDir>/tests'],
    testMatch: ['<rootDir>/tests/**/*.(test|spec).(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!lucide-react|@radix-ui|react-icons|other-esm-lib).+\\.js$'
    ],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.app.json'
        }
    },
}; 