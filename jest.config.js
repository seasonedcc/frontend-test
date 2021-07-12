module.exports = {
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', '/.next/', './test'],
  moduleDirectories: ['node_modules', './'],
  transform: {
    '^.+\\.jsx?$': './node_modules/babel-jest',
    '^.+\\.tsx?$': './node_modules/ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
}
