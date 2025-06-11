console.log('Running Jest tests with custom configuration...');

const jest = require('jest');

const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',      {
        tsconfig: './tsconfig.test.json',
      },
    ],
  },
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
};

jest.run(['--config', JSON.stringify(config)]);
