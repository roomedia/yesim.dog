<script lang="ts">
	import { makeDebouncer } from '$lib/debouncer';
	import { supabase } from '$lib/supabaseClient';
	import type { User } from '@supabase/supabase-js';
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';
	import { Todo } from '../../model/todo/Todo';
	import toast from 'svelte-french-toast';

	export let todo: Writable<Todo>;
	let textarea: HTMLTextAreaElement | undefined;
	$: if (textarea) {
		textarea.value = $todo.text;
		handleResizeHeight();
	}

	export let placeholder: string;
	const user: Writable<User | undefined> = getContext('user');
	const isMe: Writable<boolean> = getContext('isMe');

	const handleResizeHeight = () => {
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = textarea.scrollHeight + 'px';
		}
	};

	const debouncer = makeDebouncer(async () => {
		const {error} = await supabase.from('todos').update($todo).eq('userId', $user!.id);
		if (error) {
			console.error('todo update error');
			console.error(error);
			toast.error('올해 다짐 업데이트 실패..');
		} else {
			toast.success('올해 다짐 업데이트 성공!');
		}
	});

	const handleInput = () => {
		if (!$isMe) {
			return;
		}
		todo.update((old) => new Todo(old.userId, old.id, textarea?.value ?? '', old.completedAt));
		debouncer();
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
