/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "tests/.*.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "@vue-cubit/(.*)": ["../../../packages/$1"],
  },
};
