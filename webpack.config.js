
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const CopyWebpackPlugin = require('copy-webpack-plugin')

// const config = {
//   plugins: [
//     new CopyWebpackPlugin({ from: './src/assets/*', to: 'dist/assets' })
//   ]
// }

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }]
    },
    plugins: [
        htmlPlugin, 
        new CopyWebpackPlugin([
            {from:'src/assets',to:'assets'} 
        ]), 
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        
    }
}