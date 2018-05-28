import babel from 'rollup-plugin-babel';

export default [
  {
    input: './src/dragEvent.js',
    output: {
      file: './index.js',
      format: 'cjs',
    },
    plugins: [babel()],
  },
  {
    input: './src/dragEvent.js',
    output: {
      file: './index.mjs',
      format: 'es',
    },
    plugins: [babel()],
  },
];
