export default {
	YA_COUNTER_NAME: '',	// fixme
	LIVE_HOST: "",	// empty for same host as FE
	API_HOST: "",	// empty for same host as FE
	API_DEFAULT_ACTION: '/api/Form',

	STORAGE_AUTH_TOKEN: "auth",
	STORAGE_PROP_ORDER_HASH: "orderHash",
	STORAGE_PROP_USER_ID: "userId",
	STORAGE_STATS_PERIOD: "statsPeriod",
	STORAGE_STATS_POLL: "statsPoll",

	ERROR_CODE_FORBIDDEN: 403,
	API_EXCEPTION_NOT_FOUND: 'NOT_FOUND',
	API_EXCEPTION_FORBIDDEN: 'FORBIDDEN',
	API_EXCEPTION_EXISTS :'EXISTS',

	//in _variables.scss, config.js and plugins/vuetify.js
	WIDTH_SM: 600,
	WIDTH_MD: 1024,
	WIDTH_LG: 1360,
	WIDTH_XL: 1920,

	HEADER_MD: 1380,

	QUESTION_TYPE: {
		LIKE: "LIKE",
		SMILE: "SMILE",
		STARS: "STARS",
		SELECT: "SELECT",
	},

	SMS_RETRY_TIMEOUT: 30,	// sec to allow resend auth sms code
	DEFAULT_PERIOD: 7, //for statistics and journal
}
