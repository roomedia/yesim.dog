<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import type { User } from '@supabase/supabase-js';
	import moment from 'moment';
	import { getContext } from 'svelte';
	import toast from 'svelte-french-toast';
	import { type Writable } from 'svelte/store';
	import { CompletedAt, type Todo } from '../model/todo/Todo';
	import Counter from './Counter.svelte';
	import Sidebar from './Sidebar.svelte';

	export let todo: Writable<Todo | null>;
	export let completedAt: Writable<CompletedAt | null>;
	const user: Writable<User | null | undefined> = getContext('user');
	const isMe: Writable<boolean> = getContext('isMe');

	const toggleComplete = async () => {
		if (!$isMe || !$todo?.hasText) {
			return;
		}
		completedAt.update((old) => {
			return new CompletedAt(
				$user?.id,
				$todo?.id,
				old?.date ?? moment().startOf('day').format(),
				old?.isCompleted ? null : moment().format()
			);
		});
		if (!$user) {
			toast.error('로그인해야 다짐을 완료할 수 있습니다!');
			return;
		}
		if (!$completedAt) {
			toast.error('로그인해야 다짐을 완료할 수 있습니다!');
			return;
		}
		const { error } = await supabase.from('completedAt').upsert({
			date: $completedAt.date,
			todoId: $completedAt.todoId!,
			completedAt: $completedAt.completedAt,
			userId: $completedAt.userId!
		});
		if (error) {
			console.error('todo complete error:');
			console.error(error);
			toast.error('다짐 업데이트 실패..\n새로고침 후 다시 시도해주세요');
			return;
		}
		if ($completedAt?.completedAt) {
			toast.success('오늘의 다짐을 지켰어요!!');
		} else {
			toast('까먹은 내용이 있나요?', { icon: '🐶' });
		}
	};
</script>

<div>
	<Sidebar {todo} />
	<button
		class={$isMe && $todo?.hasText ? 'active ' : ''}
		id={$completedAt?.isCompleted ? 'success' : 'failed'}
		title={$isMe && $todo?.hasText && $completedAt?.isCompleted ? '눌러서 다시 시작..' : '눌러서 완료하기!'}
		on:click={toggleComplete}
	>
		<Counter {todo} {completedAt} />
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
