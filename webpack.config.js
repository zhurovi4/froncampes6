const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    entry: ['@babel/polyfill', './src/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: "app.css",
          chunkFilename: "[id].css"
        })
      ],
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/
            },
            {
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                  ],
                test: /\.css$/
            },
            {
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
                test: /\.scss$/,
              }
        ]
    }


}

module.exports = config;