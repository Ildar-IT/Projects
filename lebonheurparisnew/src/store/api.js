import axios from "axios";
import config from '@/config';
import {mergeObjects} from '@/utils/utils';
import 'axios-progress-bar/dist/nprogress.css';
import router from '../router/index';

const axiosWithProgress = axios.create();
const axiosWithoutProgress = axios.create();
// loadProgressBar({ showSpinner: false },axiosWithProgress);

let lastPushTokenProvided = null;

export function api(cmd, options) {
	// по умолчанию - GET-запрос
	options.method = options.method || 'GET';

	console.log('API '+options.method+' request \"' + cmd + '\": ', options);

	// с прогрессбаром или нет?
	let axios = null;
	if ( options.hidden ) axios = axiosWithoutProgress;
	else axios = axiosWithProgress;

	// добавляем токен авторизации
	//let authToken = Cookie.get(config.STORAGE_AUTH_TOKEN);
	//if ( !authToken )
	let authToken = localStorage.getItem(config.STORAGE_AUTH_TOKEN);
	if (authToken) axios.defaults.headers.common['Authorization'] = authToken;
	else axios.defaults.headers.common['Authorization'] = '';

	let validationToken = localStorage.getItem("validationCode");
	if (validationToken) axios.defaults.headers.common['validationCode'] = validationToken;
	else axios.defaults.headers.common['validationCode'] = '';

	// больше не используется, есть pushToken приходит из Nativescript
	const pushToken = router.currentRoute.query?.pushToken?.toString();
	if(pushToken && pushToken !== lastPushTokenProvided ) {
		axios.defaults.headers.common['PushToken'] = pushToken;
		lastPushTokenProvided = pushToken;
	}

	let params = null, data = null;
	if ( options.method === "GET" ) {
		// конкатинируем GET params & query:
		params = options.params || {};
		let query = options.query || {};
		params = mergeObjects(params, query);
	}
	else data = options.params;

	// определяем URL:
	let url = '';
	if (cmd.match(/^\/.+/)||cmd.match(/^http:.+/) ) {
		// кастомный URL
		url = cmd;
		console.log("Requesting URL: "+url);
	}
	else {
		// По умолчанию обращаемся к API
		url = (config.API_SERVER_URI?config.API_SERVER_URI:'') + '/api/' + cmd + '/';
	}

	// установка Accept
	let accepts = ["application/json"];
	if ( config.WITH_WEBP ) accepts.push("image/webp");
	axios.defaults.headers.common['Accept'] = accepts.join(", ");

	// TODO: кастомные заголовки:
	let headers = {};
	//let headers = {'Cache-Control': 'max-age=300'};
	/*if (typeof options.headers !== 'undefined' && Object.keys(options.headers).length > 0) {
        _.forEach(options.headers, (val, key) => headers[key] = val);
    }*/
	//console.log("AXIOS", axios.defaults.headers)
	return axios({
		method: options.method,
		url,
		params,
		headers,
		data
	}).catch((error) => {
		// TODO: communication error handling
		console.error('API request error: ', error);
		return error;
	}).then((response) => {
		//console.log('API Response: ', response.data?.result);
		//console.log('API Response: ', JSON.stringify(response.data?.result));

		if (!response.data) throw 'No data in response object';
		// if(response.data.error) return router.push(<any>{name: 'Error'});

		if (response.data.error) {
			// API standard error
			console.warn('API error: ', response.data.error);
			if ( response.data.code ) throw {error: response.data.error, code: response.data.code};
			else throw response.data.error;
		}
		if (!response.data||!response.data.result) throw 'No result in response data object';

		return response.data.result;
	}).finally(()=>{
		//console.log("All is done finally...");
	});


}

export default api;
