const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      backgroundColor: {
        'meompt-white': '#FAFAFA',
        'meompt-light-blue': '#C7EEFF',
        'meompt-blue': '#0077C0',
        'meompt-black': '#1D242B',
        'meompt-background': '#FAFAFA',
      },
      textColor: {
        'meompt-white': '#FFFFFF',
        'meompt-black': '#1D242B',
        'meompt-error': '#ff0000',
      },
      colors: {
        'meompt-white': '#FAFAFA',
        'meompt-light-blue': '#C7EEFF',
        'meompt-blue': '#0077C0',
        'meompt-black': '#1D242B',
      },
    },
  },
  plugins: [],
};
