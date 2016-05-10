module.exports = {
    entry: './src/client/index.jsx',
    output: {
        filename: 'public/js/bundle.js',
        publicPath: 'http://localhost:8090/js'
    },
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx$/,
                loader: 'jsx-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}