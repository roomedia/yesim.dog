<script lang="ts">
	import moment from 'moment';
	import { writable } from 'svelte/store';

	export let hasTodo: boolean;
	const hours = writable(0);
	const minutes = writable(0);
	const seconds = writable(0);
	const milliseconds = writable(0);

	let interval: number;
	$: if (hasTodo) {
		initCounter();
	} else {
		clearCounter();
	}

	function initCounter() {
		function convertMoment() {
			const timeDiff = moment().endOf('day').diff(moment());
			const duration = moment.duration(timeDiff);

			hours.set(duration.hours());
			minutes.set(duration.minutes());
			seconds.set(duration.seconds());
			milliseconds.set(duration.milliseconds());
		}

		convertMoment();
		interval = setInterval(() => {		
			convertMoment();
		}, 40);
	}

	function clearCounter() {
		clearInterval(interval);
		hours.set(0);
		minutes.set(0);
		seconds.set(0);
		milliseconds.set(0);
	}

	function padding(number: number, maxLength: number = 2) {
		number = Math.floor(number);
		return number.toString().padStart(maxLength, '0');
	}
</script>

<div class="counter-viewport {hasTodo ? 'active' : ''}">
	<strong>{padding($hours)}:{padding($minutes)}:{padding($seconds)}.{padding($milliseconds, 3)}</strong>
</div>

<style>
	.counter-viewport {
		font-size: 4em;
		user-select: none;
	}

	.active {
		color: var(--color-theme-1);
	}
</style>
