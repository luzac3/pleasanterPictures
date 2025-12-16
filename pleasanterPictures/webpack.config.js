const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

let entries = {};
glob
    .sync("./wwwroot/ts/**/Index.ts", {
        ignore: "./wwwroot/ts/**/*.d.ts"
    })
    .map(function (file) {
        const rel = path.relative(path.join(__dirname, 'wwwroot/ts'), file).replace(/\\/g, '/');
        const key = rel.replace(/\.ts$/, "").split("/")[0];
        entries[key] = path.resolve(__dirname, file);
    });

module.exports = (env, argv) => {
    const IS_DEVELOPMENT = argv.mode === "development";

    const configs = {

        devServer: {
            index: "Index.html",
            port: 9223,
        },

        entry: entries,

        output: {
            path: path.join(__dirname, "/wwwroot/js"),
            filename: '[name].js'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                }
            ],
        },
        resolve: {
            extensions: [
                '.ts', '.js',
            ],
            alias: {
                '@root': path.resolve(__dirname, './wwwroot/ts/')
            }
        }
    }

    if (IS_DEVELOPMENT) {
        configs.devtool = 'source-map';
    }

    return configs;
};
