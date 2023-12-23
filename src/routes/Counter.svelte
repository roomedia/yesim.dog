<script lang="ts">
	import moment from 'moment';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let hasToDo: boolean;
	const hours = writable(0);
	const minutes = writable(0);
	const seconds = writable(0);
	const milliseconds = writable(0);

	$: if (hasToDo) {
		convertMoment();
		onMount(() => {
			setInterval(() => {		
				convertMoment();
			}, 40);
		});
	}

	function convertMoment() {
		const timeDiff = moment().endOf('day').diff(moment());
		const duration = moment.duration(timeDiff);

		hours.set(duration.hours());
		minutes.set(duration.minutes());
		seconds.set(duration.seconds());
		milliseconds.set(duration.milliseconds());
	}

	function padding(number: number, maxLength: number = 2) {
		number = Math.floor(number);
		return number.toString().padStart(maxLength, '0');
	}
</script>

<div class="counter-viewport {hasToDo ? 'active' : ''}">
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
