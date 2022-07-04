/**
 * Same as PHP number_format()
 * @param {string | number} number
 * @param {number} decimals
 * @param {string} dec_point
 * @param {string} thousands_sep
 * @returns {string}
 */
export function nf(number, decimals = 0, dec_point = ',', thousands_sep = ' ') {
	number = ((number + '')).replace(/[^0-9+\-Ee.]/g, '');
	const n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		toFixedFix = function (n, prec) {
			const k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
		};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	let s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
};

/**
 * Same as nf for currency formatting.
 * Appends ₽ (rouble sign) to output.
 * @param number
 * @param decimals
 * @param dec_point
 * @param thousands_sep
 * @returns {string}
 */
export function cf(number, decimals = 0, dec_point = ',', thousands_sep = ' ') {
	return nf(number, decimals, dec_point, thousands_sep)+" ₽";
}

/**
 * The famous PlayNext string-end routine.
 * @param {number} count
 * @param {string} one
 * @param {string} two
 * @param {string} many
 * @returns {string}
 */
export function end(count, one, two, many) {
	let n = (count + '');
	let e = parseInt(n.substring(n.length, n.length - 1));
	let e2 = parseInt(n.substring(n.length, n.length - 2));
	//console.log(n+":"+n.substring(n.length,n.length-1)+":"+n.substring(n.length,n.length-2));
	if (e >= 2 && e <= 4 && !(e2 >= 11 && e2 <= 19)) return two;
	else if (e === 1 && !(e2 >= 11 && e2 <= 19)) return one;
	return many;
};
