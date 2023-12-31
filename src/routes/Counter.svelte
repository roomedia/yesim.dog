<script lang="ts">
	import moment, { type Moment } from 'moment';
	import { writable, type Writable } from 'svelte/store';
	import type { CompletedAt, Todo } from '../model/todo/Todo';

	export let todo: Writable<Todo | null>;
	export let completedAt: Writable<CompletedAt | null>;

	const hours = writable(0);
	const minutes = writable(0);
	const seconds = writable(0);
	const milliseconds = writable(0);

	let interval: number;
	$: {
		clearInterval(interval);
		if ($todo?.hasText) {
			if ($completedAt?.isCompleted) {
				convertMoment(moment($completedAt.completedAt));
			} else {
				initCounter();
			}
		} else {
			clearCounter();
		}
	}

	const convertMoment = (time: Moment) => {
		const timeDiff = moment().endOf('day').diff(time);
		const duration = moment.duration(timeDiff);

		hours.set(duration.hours());
		minutes.set(duration.minutes());
		seconds.set(duration.seconds());
		milliseconds.set(duration.milliseconds());
	};

	const initCounter = () => {
		interval = setInterval(() => {
			convertMoment(moment());
		}, 40);
	};

	const clearCounter = () => {
		hours.set(0);
		minutes.set(0);
		seconds.set(0);
		milliseconds.set(0);
	};

	const padding = (number: number, maxLength: number = 2) => {
		number = Math.floor(number);
		return number.toString().padStart(maxLength, '0');
	};
</script>

<strong class={$todo?.hasText ? 'active' : ''}>
	{padding($hours)}:{padding($minutes)}:{padding($seconds)}.{padding($milliseconds, 3)}
</strong>

<style>
	strong {
		margin-top: 0.2em;
		font-size: 3em;
		user-select: none;
		color: var(--color-text);
	}

	@media (min-width: 720px) {
		strong {
			margin-top: 0;
			font-size: 4em;
		}
	}

	.active {
		color: var(--color-theme-1);
	}
</style>
