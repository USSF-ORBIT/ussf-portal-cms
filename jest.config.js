module.exports = {
  roots: ['<rootDir>', '<rootDir>/src/'],
  testPathIgnorePatterns: ['/node_modules/', '.keystone/', 'e2e/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(.keystone)/)'],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 75,
      functions: 60,
      lines: 70,
    },
  },
}
