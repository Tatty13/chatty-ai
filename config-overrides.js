module.exports = function override(config, env) {
	// New config, e.g. config.plugins.push...
	// console.log(JSON.stringify(config.resolve.fallback))
	 config.resolve.fallback = {
		  path: false,
		  os: false,
		  crypto: false,
		  ...config.resolve.fallback
	 };  
	 return config
}