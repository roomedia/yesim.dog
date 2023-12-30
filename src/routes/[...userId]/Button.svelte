<script lang="ts">
	import moment from 'moment';
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';
	import { Todo } from '../../model/todo/Todo';
	import Counter from './Counter.svelte';

	export let todo: Writable<Todo>;
	const isMe: Writable<boolean> = getContext('isMe');

	const toggleComplete = async () => {
		if (!$isMe || !$todo.hasText) {
			return;
		}
		const completedAt = $todo.isCompleted ? null : moment().format();
		todo.update((old) => new Todo(old.userId, old.id, old.text, completedAt));
		fetch('api/todo/complete', {
			method: 'POST',
			body: JSON.stringify({ completedAt }),
			headers: {
				'x-sveltekit-action': 'true',
				'content-type': 'application/json'
			}
		});
	};
</script>

<button class={$isMe && $todo.hasText ? 'active' : ''} on:click={toggleComplete}>
	<span class="emoji {$todo.isCompleted ? '' : 'gone'}" id="success">😊</span>
	<span class="emoji {$todo.isCompleted ? 'gone' : ''}" id="failed">🐶</span>
	<Counter {todo} />
</button>

<style>
	button {
		height: auto;
		max-width: var(--column-width);
		padding: 2em;
		background-color: var(--color-theme-2);
		background-image: radial-gradient(
			70% 80% at 50% 60%,
			rgba(255, 255, 255, 0.9) 0%,
			rgba(255, 255, 255, 0) 100%
		);
		cursor: initial;
	}

	button:hover {
		background-color: var(--color-theme-2);
		background-blend-mode: normal;
	}

	.active {
		cursor: pointer;
	}

	.emoji {
		font-size: 12em;
		display: block;
	}

	.gone {
		display: none;
	}
</style>
