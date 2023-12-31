<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import type { User } from '@supabase/supabase-js';
	import moment from 'moment';
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';
	import { Todo } from '../../model/todo/Todo';
	import Counter from './Counter.svelte';
	import Sidebar from './Sidebar.svelte';
	import toast from 'svelte-french-toast';

	export let todo: Writable<Todo>;
	const user: Writable<User | null | undefined> = getContext('user');
	const isMe: Writable<boolean> = getContext('isMe');

	const toggleComplete = async () => {
		if (!$isMe || !$todo.hasText) {
			return;
		}
		const completedAt = $todo.isCompleted ? null : moment().format();
		todo.update((old) => new Todo(old.userId, old.id, old.text, completedAt));
		if (!$user) {
			toast.error('로그인해야 다짐을 완료할 수 있습니다!');
			return;
		}
		if ($todo.completedAt) {
			toast.success('오늘의 다짐을 지켰어요!!');
		} else {
			toast('까먹은 내용이 있나요?', { icon: '🐶' });
		}
		const { error } = await supabase.from('todos').update($todo).eq('userId', $user.id);
		if (error) {
			console.error('todo complete error:');
			console.error(error);
			toast.error('다짐 업데이트 실패..\n새로고침 후 다시 시도해주세요');
		}
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
		background-image: radial-gradient(
			70% 80% at 50% 60%,
			rgba(255, 255, 255, 0.9) 0%,
			rgba(255, 255, 255, 0) 100%
		);
		cursor: initial;
	}

	button:hover {
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
