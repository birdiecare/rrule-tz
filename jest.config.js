module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "test",
  testRegex: ".(spec|test).(ts|js)$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  testEnvironment: "node"
};
