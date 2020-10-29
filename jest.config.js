module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/jest/svg-transform.js',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  moduleNameMapper: {
    '\\.(jpg|png)$': '<rootDir>/spec/empty-module.js'
  },
  setupFilesAfterEnv: ['<rootDir>spec/setup.js'],
  moduleDirectories: ['node_modules', 'src']
};
