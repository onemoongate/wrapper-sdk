const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: false,
    stream: false, 
    assert: false, 
    http: false, 
    https: false,
    os: false, 
    url: false, 
    zlib: false, 
    fs: false, 
    path: require.resolve('path-browserify'), 
    net: require.resolve('net-browserify'), 
    tls: require.resolve('tls-browserify'), 
    tty: require.resolve('tty-browserify'),
    encoding: require.resolve('text-encoding'),
  });

  config.resolve.fallback = fallback;

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  config.ignoreWarnings = [/Failed to parse source map/];

  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    loader: require.resolve("source-map-loader"),
    resolve: {
      fullySpecified: false,
    },
  });

  return config;
};
