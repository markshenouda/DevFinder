const nextTranslate = require("next-translate");

module.exports = {
	...nextTranslate(),
	target: "serverless",
	images: {
		domains: ["avatars.githubusercontent.com"],
	},
};
