const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../../tsconfig.json');

module.exports = {
  name: 'electron',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/electron',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/../../",
  }),
};
