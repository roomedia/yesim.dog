<script lang="ts">
	import { type Writable } from 'svelte/store';
	import { Todo } from '../../model/todo/Todo';
	import { getContext } from 'svelte';

	export let todo: Writable<Todo>;
	let textarea: HTMLTextAreaElement | undefined;
	$: if (textarea) {
		textarea.value = $todo.text;
		handleResizeHeight();
	}

	export let placeholder: string;
	let setTodoTimer: number | undefined = undefined;
	const isMe: Writable<boolean> = getContext('isMe');

	const handleResizeHeight = () => {
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = textarea.scrollHeight + 'px';
		}
	};

	const setTodoDebounced = (todo: string, timeout: number = 750) => {
		if (setTodoTimer) {
			clearTimeout(setTodoTimer);
		}
		setTodoTimer = setTimeout(() => {
			fetch('api/todo/update', {
				method: 'POST',
				body: JSON.stringify({ todo }),
				headers: {
					'x-sveltekit-action': 'true',
					'content-type': 'application/json'
				}
			});
		}, timeout);
	};

	const handleInput = () => {
		if (!$isMe) {
			return;
		}
		todo.set(new Todo(textarea?.value ?? ''));
		setTodoDebounced(textarea?.value ?? '');
	};
</script>

<h1>
	오늘부터<br />
	<textarea
		id="todo"
		rows="1"
		spellcheck="false"
		{placeholder}
		disabled={!$isMe}
		bind:this={textarea}
		on:input={handleInput}
	/><br />
	내가 🐶다
</h1>

<style>
	#todo {
		height: 53px;
		border: 0px;
		margin: -0.2em 0 -0.4em 0;
		resize: none;
		outline: none;
		background: transparent;
		overflow: hidden;
		text-align: center;
		text-decoration: underline wavy var(--color-theme-1);
		color: var(--color-text);
		font-size: 2.1rem;
		font-weight: bold;
	}

	@media (min-width: 720px) {
		#todo {
			font-size: 2.5rem;
		}
	}
</style>
