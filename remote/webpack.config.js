const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    output: {
        publicPath: "http://localhost:8081/",
        uniqueName: "remoteApp",
        scriptType: "text/javascript",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".vue", ".jsx", ".js", ".json"],
    },

    devServer: {
        port: 8081,
        hot: true,
        historyApiFallback: true,
        allowedHosts: "all",
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.tsx?$/,
                use: [
                "babel-loader",
                {
                    loader: "ts-loader",
                    options: {
                    transpileOnly: true,
                    appendTsSuffixTo: ["\\.vue$"],
                    happyPackMode: true,
                    },
                },
                ],
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },

    plugins: [
        new VueLoaderPlugin(),
        new ModuleFederationPlugin({
            name: "app2",
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
