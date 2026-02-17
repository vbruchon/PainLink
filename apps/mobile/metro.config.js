//@ts-nocheck
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// --- SVG transformer ---
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: true,

  // on retire svg des assets
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),

  // on ajoute svg aux extensions source
  sourceExts: [...config.resolver.sourceExts, 'svg'],
};

module.exports = withNativeWind(config, {
  input: './global.css',
});
