import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/content/index.ts',
    output: {
      file: 'dist/content.js',
      format: 'iife'
    },
    plugins: [typescript()]
  },
  {
    input: 'src/background/index.ts',
    output: {
      file: 'dist/background.js',
      format: 'iife'
    },
    plugins: [typescript()]
  },
  {
    input: 'src/popup/index.ts',
    output: {
      file: 'dist/popup.js',
      format: 'iife'
    },
    plugins: [typescript()]
  }
];
