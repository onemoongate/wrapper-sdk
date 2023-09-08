import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from 'rollup-plugin-babel';
import execute from 'rollup-plugin-execute';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: 'dist/index.js',
      sourcemap: true, 
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      preferBuiltins: false
    }),
    postcss({
      plugins: [],
      inject: true,  // Inject styles as a <style> tag in the head of your document
      extract: false  // Extract CSS to the same location where the JavaScript file is generated
    }),
    commonjs(), // Helps Rollup understand CommonJS formatted modules
    typescript(), // Converts TypeScript to JavaScript
    json(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'] // Ensuring Babel transpiles TypeScript output
    }),
    execute('npx postcss src/tailwind.css -o dist/tailwind.output.css')
  ]
};
