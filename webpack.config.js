
import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)
const entryPath = path.resolve(__dirname, 'src/index.js')
const outputPath = path.resolve(__dirname, 'dist')

// Define the configuration object for the development build
const developmentConfig = {
    mode: 'development',
    entry: entryPath,
    output: {
        path: outputPath,
        filename: 'crunchyroll-js-api.debug.js',
        library: {
            type: 'module'
        }
    },
    optimization: {
        minimize: false
    },
    experiments: {
        outputModule: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'webpack-conditional-loader'
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/config/config.json'),
                to: path.resolve(outputPath, 'types/config/config.json')
            }]
        })
    ],
    devtool: 'source-map'
}

const productionConfig = { ...developmentConfig }
productionConfig.mode = 'production'
productionConfig.output = { ...productionConfig.output }
productionConfig.output.filename = 'crunchyroll-js-api.min.js'
productionConfig.optimization = { minimize: true, minimizer: [new TerserPlugin()] }
productionConfig.devtool = false
productionConfig.plugins = [
    ...developmentConfig.plugins,
    new TerserPlugin() // Ensure to add TerserPlugin here because it will be included in the spread of plugins from developmentConfig
]

// Export the two configuration objects as an array
export default [productionConfig, developmentConfig]
