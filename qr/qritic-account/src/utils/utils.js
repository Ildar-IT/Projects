/**
 * Returns merged objects as a sibgle object.
 * TS so far does not support this out of the box.
 */
import config from '@/config';
export function mergeObjects(...args) {
	let target = args[0];
	for (let i = 1; i < arguments.length; i++) {
		let source = arguments[i];
		for (let key in source) {
			if (source.hasOwnProperty(key)) {
				target[key] = source[key];
			}
		}
	}
	return target;
}

export function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

export function crossDownload(url) {
	//window.location.href = url;
	const req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.responseType = "blob";

	let authToken = localStorage.getItem(config.STORAGE_AUTH_TOKEN);
	req.setRequestHeader('Authorization', authToken);

	req.onload = function (event) {
		const blob = req.response;
		let fileName = req.getResponseHeader('Content-Disposition').split("filename=")[1];

		fileName=decodeURI(fileName.replace(/['"]/g, ''))
		const __fileName = fileName;
		const contentType = req.getResponseHeader("content-type");
		if (window.navigator.msSaveOrOpenBlob) {
			// Internet Explorer
			window.navigator.msSaveOrOpenBlob(new Blob([blob], {type: contentType}), fileName);

		} else if (window.navigator.userAgent.match(`CriOS`)) {
			console.log('Chrome iOS download file type from header is ', contentType);
			const reader = new FileReader();
			reader.onload = (event) => {
				//window.open(event.target.result, "_blank");
				const link = document.createElement('a');
				document.body.appendChild(link);
				link.download = __fileName;
				link.target = "_blank";
				//link.href = window.URL.createObjectURL(new Blob([blob], {type: contentType}));
				link.href = event.target.result ;
				link.click();
				document.body.removeChild(link); //remove the link when done
			}
			reader.readAsDataURL(new Blob([blob], {type: 'application/vnd.ms-excel'}));
		} else {
			const link = document.createElement('a');
			document.body.appendChild(link);
			link.download = __fileName;
			//link.href = window.URL.createObjectURL(new Blob([blob], {type: contentType}));
			link.href = window.URL.createObjectURL(blob);
			link.click();
			document.body.removeChild(link); //remove the link when done
		}
	};
	req.send();
};