module.exports = {
    entry: {
        main: [
            './script1',
            './script2'
        ]
    },
    output: {
        filename: './pulic/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: 'babel'
            }
        ]
    },
     resolveLoader: {
        moduleExtensions: ['-loader']
    },
}