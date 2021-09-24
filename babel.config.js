module.exports = {
  plugins: [
    [
      "module:react-native-dotenv",
      {
        allowUndefined: true,
        moduleName: "@env",
        path: ".env",
        safe: false
      }
    ]
  ],
  presets: [
    'module:metro-react-native-babel-preset',
  ],
};
