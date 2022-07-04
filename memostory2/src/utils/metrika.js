import config from '@/config';

export default {
	reachGoal(goal, params) {
		console.log("YM goal try: " + goal);
		const yaCounter = this.yaCounter();
		if (yaCounter) {
			yaCounter.reachGoal(goal, params);
			console.log("YM goal sent: " + goal);
		}
	},

	hit() {
		console.log("YM hit try: " + window.location.href);
		const yaCounter = this.yaCounter();
		if (yaCounter) {
			yaCounter.hit(window.location.href);
			console.log("YM hit sent: " + window.location.href);
		}
	},

	yaCounter() {
		const yaCounterName = config.YA_COUNTER_NAME;
		if (yaCounterName) {
			const yaCounter = window[yaCounterName];
			if (yaCounter) return yaCounter;
		}
		return null;
	}
};
