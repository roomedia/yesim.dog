<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import type { User } from '@supabase/supabase-js';
	import moment from 'moment';
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';
	import { Todo } from '../../model/todo/Todo';
	import Counter from './Counter.svelte';
	import Sidebar from './Sidebar.svelte';

	export let todo: Writable<Todo>;
	const user: Writable<User | undefined> = getContext('user');
	const isMe: Writable<boolean> = getContext('isMe');

	const toggleComplete = async () => {
		if (!$isMe || !$todo.hasText) {
			return;
		}
		const completedAt = $todo.isCompleted ? null : moment().format();
		todo.update((old) => new Todo(old.userId, old.id, old.text, completedAt));
		await supabase.from('todos').update($todo).eq('userId', $user!.id);
	};
</script>

<div>
	<Sidebar {todo} />
	<button class={$isMe && $todo.hasText ? 'active' : ''} on:click={toggleComplete}>
		<span class="emoji {$todo.isCompleted ? '' : 'gone'}" id="success">😊</span>
		<span class="emoji {$todo.isCompleted ? 'gone' : ''}" id="failed">🐶</span>
		<Counter {todo} />
	</button>
</div>

<style>
	div {
		display: flex;
	}

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
