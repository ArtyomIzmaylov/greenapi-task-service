const path = require("path");
module.exports ={
    entry: {
        m1: "./build/m1/app.js",
        m2: "./build/m2/app.js",

    },
    output: {
        filename: '[name].bundle.js',
        publicPath: "/",
        path: path.join(__dirname, 'dist'),
        clean: true
    },
    mode : 'development',
    target: 'node',
    module: {
        rules: [
            {
                test : /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
}
