import Vue from 'vue';
import {nf, cf, price, phone} from './string';

const filters = {
	nf,
	cf,
	price,
	phone
};

export default () => {
	for (let filterName in filters) {
		if (!filters.hasOwnProperty(filterName)) continue;
		Vue.filter(filterName, filters[filterName]);
	}
}