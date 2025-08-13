// jest.config.ts

const config = {
  preset: 'jest-expo',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|react-clone-referenced-element' +
      '|@expo' +
      '|expo(nent)?' +
      '|@expo(nent)?/.*' +
      '|expo-font' +
      '|expo-asset' +
      ')/)'
  ]
};

export default config;
