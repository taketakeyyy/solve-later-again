module.exports = {
    mode: 'development',
    entry: './src/content.js',
    output: {
        path: __dirname + "/dst",
        filename: 'content.js',
    },
    optimization: {
        minimize: true,
    },
    //devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/, // .jsファイルを処理対象として指定
                exclude: /node_modules/,
                use: {  // test プロパティにマッチしたファイルに対する処理を指定
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};