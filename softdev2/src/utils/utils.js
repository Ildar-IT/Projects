/**
 * Returns merged objects as a sibgle object.
 * TS so far does not support this out of the box.
 */
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

export function format(value, pattern) {
	let i = 0;
	let  v = value.toString();
	return pattern.replace(/#/g, _ => v[i++]);
}

export function iOSMobile() {
	const iOSMobile = [
			'iPad Simulator',
			'iPhone Simulator',
			'iPod Simulator',
			'iPad',
			'iPhone',
			'iPod'
		].includes(navigator.platform)
		// iPad on iOS 13 detection
		|| (navigator.userAgent.includes("Mac") && "ontouchend" in document);
	console.log("IsIos iOSMobile " , iOSMobile)
	return iOSMobile
}
