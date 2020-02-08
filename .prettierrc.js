module.exports = {
  bracketSpacing: false,
  endOfLine: 'lf',
  jsxBracketSameLine: false,
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'es5',
  useTabs: false,
  overrides: [
    {
      files: '*.json',
      options: {
        singleQuote: false,
        trailingComma: 'none',
      },
      parser: 'json',
    },
  ],
};
