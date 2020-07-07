const HtmlWebpackPlugin       = require('html-webpack-plugin')
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin              = require('copy-webpack-plugin');
const MinifyPlugin            = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {

    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ] // minificar codigo css
    },
    output: {
        filename: 'main.[contentHash].js' //salida del main.454548.js con hash
    },
    module: {
        rules: [
            { 
                test: /\.js$/, // solo afecta los archicos de js
                exclude: /node_modules/, 
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/, // todos estos archivos
                exclude: /styles\.css$/, // lo tenemos que sacar ya que lo hacemos mas abajo.
                use: [
                    'style-loader', // usamos los paquetes de css
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/, //busque el global css
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/, // que busque un archivo .html va aplicar esta regla
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false // true: para limpiar el html y dejarlo en una sola linea index.html
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/, // evaluamos cualquier imagen
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
       new HtmlWebpackPlugin({
           filename: 'index.html',
           template: 'src/index.html',
       }),
       new MiniCssExtractPlugin({ // le tenemos que decir como va a trabajar
        filename: '[name].[contentHash].css', // nombre que le queremos dar el archivo main.css
        ignoreOrder: false // para q no nos tire warning
        }),
        new CopyPlugin({
            patterns: [
              // de la carpeta que quiero q empieze a copiar a destino
              { from: 'src/assets', to: 'assets/' },
            ],
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
    ]

}