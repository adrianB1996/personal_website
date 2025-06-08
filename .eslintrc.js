module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Allow unescaped apostrophes in JSX
    'react/no-unescaped-entities': [
      'error',
      {
        forbid: ['>', '}', '"', '`'],
        allow: ["'"] // Allow apostrophes
      }
    ]
  }
};
