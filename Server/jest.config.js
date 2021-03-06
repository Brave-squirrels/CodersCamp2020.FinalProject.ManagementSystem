module.exports = {
  roots: ["<rootDir>/__tests__"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testEnvironment: "node",
  testPathIgnorePatterns: ["users.test.ts",  "projects.test.ts","comments.test.ts","notes.test.ts","tasks.test.ts","email.test.ts","auth.test.ts","user.test.ts",],
};
