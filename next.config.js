const nextTranslate = require("next-translate");

module.exports = {
	...nextTranslate(),
	images: {
		domains: ["avatars.githubusercontent.com"],
	},
};
