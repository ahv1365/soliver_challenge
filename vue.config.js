const { defineConfig } = require("@vue/cli-service");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      definitions[0]["__VUE_OPTIONS_API__"] = true;
      definitions[0]["__VUE_PROD_DEVTOOLS__"] = false;
      definitions[0]["__VUE_PROD_HYDRATION_MISMATCH_DETAILS__"] = false;
      return definitions;
    });
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      // Adjust the filename for Brotli compression
      new CompressionPlugin({
        filename: "[path][base].br",
        algorithm: "brotliCompress",
        test: /\.(js|css|html|svg)$/,
        compressionOptions: { level: 11 },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false, // Do not delete original assets
      }),
      new BundleAnalyzerPlugin({
        analyzerMode:
          process.env.NODE_ENV === "production" ? "static" : "disabled",
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
    },
  },
});
