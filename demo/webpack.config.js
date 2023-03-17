const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8082/",
  },

  devServer: {
    port: 8082,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".vue", ".jsx", ".js", ".json"],
    alias: {
      vue: "vue/dist/vue.js",
    },
  },
  
  plugins: [
    new ModuleFederationPlugin({
      name: "demo",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./Header": "./src/Header.vue",
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
