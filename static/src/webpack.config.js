/**
 * Created by raylenmargono on 7/3/17.
 */
var webpack = require('webpack');
var glob = require("glob");
var path = require("path");

var files = glob.sync("./!(bower_components|node_modules|**.**)/js/*App.js");
var entry = {};

files.forEach(function (file) {
    //webpack will use the key as the output
    var fileName = file.split("/").pop();
    //get the file name, not the extension
    fileName = fileName.split(".")[0];
    entry[fileName] = file;
});

module.exports = {
    context: __dirname,
    entry: entry,
    devServer:{
        inline : true,
        port : 1111
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].min.js"
    },
    cache: true,
    module : {
        loaders : [
            {
                test :  /(\.jsx|\.js)$/,
                exclude : /node_modules/,
                loader: 'babel-loader',
                query : {
                    presets : ["es2015", "react", "stage-1"],
                    plugins : ["transform-decorators-legacy"]

                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    resolve:{
        modules: [
            path.resolve(__dirname),
            path.resolve("./node_modules")
        ],
        alias: {
            jsx : 'jsx',
            js : 'js'
        },
        extensions: ['.js', '.jsx']
    },
    plugins:  [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false, compress : {warnings: true} }),
        new webpack.DefinePlugin({
          "process.env": {
             NODE_ENV: JSON.stringify("production")
           }
        })
    ],
};