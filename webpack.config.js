/**
 * Build our JS with Babel,
 * build CSS with PostCSS while adding Tailwind,
 * run images through imagemin,
 * and run browsersync
 */

const BrowserSyncPlugin      = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin      = require('copy-webpack-plugin');
const ImageminPlugin         = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin   = require('mini-css-extract-plugin');

const isProduction = 'production' === process.env.NODE_ENV;

const config = {
	entry: './assets/js/main.js',
	output: {
		path: require('path').resolve(__dirname, 'dist'),
		assetModuleFilename: data => data.filename.replace(/^assets\//, ''),
	},
	mode: process.env.NODE_ENV,
	devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
	optimization: {
		minimize: isProduction,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: [ [ '@babel/preset-env' ] ]
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '',
						},
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									require('postcss-import'),
									require('tailwindcss'),
									require('postcss-preset-env')({ stage: 1 }),
									...(isProduction ? [require('cssnano')] : []),
								],
							}
						},
					}
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: 'asset',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		]
	},
	resolve: {
		alias: {
			'@' : require('path').resolve('assets'),
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: './assets/images/',
					to: 'images',
					globOptions: { dot: false },
					noErrorOnMissing: true,
				},
				{
					from: './assets/fonts/',
					to: 'fonts',
					globOptions: { dot: false },
					noErrorOnMissing: true,
				},
			],
		}),
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			disable: !isProduction,
		}),
	]
} // End of `const config = {`

// Run browsersync when in development mode
if (!isProduction) {
	// Create a local browsersync config you can customize
	if( !require('fs').existsSync('bs-config.js') ){
		const defaultBSConfig = JSON.stringify({
			proxy: 'localhost',
			files: [ '**/*.php' ],
			port: 3000,
			notify: false,
		}, null, '\t');
		require('fs').writeFileSync(
			'./bs-config.js',
			'// Customize this file for your local environment\n' +
			'// https://browsersync.io/docs/options\n' +
			`module.exports = ${defaultBSConfig};\n`,
			'utf-8'
		);
	}
	config.plugins.push(
		new BrowserSyncPlugin( require('./bs-config.js') )
	);
}

module.exports = config
