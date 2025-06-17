module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|expo|@expo|react-native-gesture-handler|react-native-reanimated|react-native-screens|react-native-safe-area-context)/)',
  ],
  testMatch: [
    '**/__tests__/**/*.(js|ts|tsx)',
    '**/*.(test|spec).(js|ts|tsx)',
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'hooks/**/*.{js,ts,tsx}',
    'components/**/*.{js,ts,tsx}',
  ],
};
