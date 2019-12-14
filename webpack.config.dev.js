const path = require('path');

module.exports = {
	mode: 'development',
	watch: true,
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3000
	}
};