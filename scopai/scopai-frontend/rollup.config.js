// rollup.config.js
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'path/to/your/entry/file.js', // Update this with the path to your entry file
  output: {
    file: 'dist/bundle.js', // Update this with the desired output path and filename
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    resolve(), // Allows Rollup to find dependencies in node_modules
    terser(), // Minifies the output
  ],
};
