const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin} = require('clean-webpack-plugin');
let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
}

module.exports = {
    mode: mode,
    target: target,

    output: {
        filename: "./js/bundle.js",
        path: path.resolve(__dirname, "dist"),
        // если включить относительные пусти и включить CleanWebpackPlugin, то папка images не создается
        assetModuleFilename: "..//images/[name][ext][query]",
    },

    module: {
        rules: [
            {
                test: /\.(jpg|png|svg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" },
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },

    plugins: [
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/style.css',
        }),

        new HtmlWebPackPlugin(
            {
                template: "./src/index.html",
                filename: 'index.html',
                inject: "body",
            },
        ),

        new HtmlWebPackPlugin(
            {
                template: "./src/home.html",
                filename: 'home.html',
                inject: "body",
            },
        ),

        new HtmlWebPackPlugin(
            {
                template: "./src/test.html",
                filename: 'test.html',
                inject: false,
            },
        ),
    ],

    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
        hot: true,
        port: 1721,
    },
}
