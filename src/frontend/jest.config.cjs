module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ["/node_modules/(?!node-fetch).+\\.js$"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/fileMock.js",
    "\\.(css|less)$": "<rootDir>/styleMock.js",
  },
  // rest of your configuration
};