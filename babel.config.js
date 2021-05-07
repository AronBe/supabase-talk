module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.android.tsx',
          '.android.ts',
          '.ios.tsx',
          '.ios.ts',
          '.png',
          '.ts',
          '.tsx',
        ],
        root: ['./src'],
      },
    ],
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg'],
      },
    ],
  ],
};
