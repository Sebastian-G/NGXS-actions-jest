require('jest-preset-angular/ngcc-jest-processor');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  cacheDirectory: './.jest',
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  // FIXME: can be removed after https://github.com/facebook/jest/issues/11483 was fixed
  //  (required to use the mock engine).
  testRunner: 'jest-jasmine2',
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@environments/(.*)': '<rootDir>/src/environments/$1'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!**/*.spec.ts',
    '!**/index.ts',
    '!**/*.module.ts',
    '!**/*.d.ts',
    '!**/*.mock.ts',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['json', 'lcov', 'clover'],
  // Automatically clear mock calls and instances before every test.
  clearMocks: true
};
