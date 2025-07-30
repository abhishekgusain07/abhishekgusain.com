// eslint.config.mjs - Disable all ESLint rules
export default [
  {
    // Apply to all files
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],

    // This ignores all rules entirely
    ignores: ["**/*"],

    // In case the ignores pattern doesn't work, also disable all rules
    rules: {},

    // Turn off reporting for unused disable directives
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
  },
];
