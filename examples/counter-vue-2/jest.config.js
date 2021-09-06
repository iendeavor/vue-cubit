module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "tests/.*.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "@vue-cubit/(.*)": ["../../packages/$1"],
  },
};
