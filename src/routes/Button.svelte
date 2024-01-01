<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import type { User } from '@supabase/supabase-js';
	import moment from 'moment';
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';
	import Counter from './Counter.svelte';
	import Sidebar from './Sidebar.svelte';
	import toast from 'svelte-french-toast';
	import { Todo } from '../model/todo/Todo';

	export let todo: Writable<Todo |undefined>;
	const user: Writable<User | null | undefined> = getContext('user');
	const isMe: Writable<boolean> = getContext('isMe');

	const toggleComplete = async () => {
		if (!$isMe || !$todo?.hasText) {
			return;
		}
		const completedAt = $todo.isCompleted ? null : moment().format();
		todo.update((old) => new Todo(old!.userId, old!.id, old!.text, completedAt));
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
	<button
		class={$isMe && $todo?.hasText ? 'active ' : ''}
		id={$todo?.isCompleted ? 'success' : 'failed'}
		on:click={toggleComplete}
	>
		<Counter {todo} />
	</button>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 720px) {
		div {
			flex-direction: row;
		}
	}

	button {
		width: 100vw;
		height: 100vw;
		background-size: cover;
		cursor: initial;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		border: 0.1px solid var(--color-border);
	}

	.active {
		cursor: pointer;
	}

	#success {
		background-image: url($lib/images/success.png);
	}

	#failed {
		background-image: url($lib/images/failed.png);
	}

	@media (min-width: 720px) {
		button {
			width: 30em;
			height: 30em;
		}
	}
</style>
