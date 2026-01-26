
const path = require('path');
const { getDefaultConfig } = require("expo/metro-config");
const { withStorybook } = require("@storybook/react-native/metro/withStorybook");

const projectRoot = __dirname;
const uikitPath = path.resolve(projectRoot, '../packages/uikit'); 

const config = getDefaultConfig(projectRoot);

config.watchFolders = [
  uikitPath,
];

config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(uikitPath, 'node_modules'),
  ],
  extraNodeModules: {
    uikit: uikitPath,
  },
};

module.exports = withStorybook(config, {
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
});
