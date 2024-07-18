import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/content/index.ts',
    output: {
      file: 'dist/content.js',
      format: 'cjs'
    },
    plugins: [typescript()]
  },
  {
    input: 'src/background/index.ts',
    output: {
      file: 'dist/background.js',
      format: 'cjs'
    },
    plugins: [typescript()]
  }
];