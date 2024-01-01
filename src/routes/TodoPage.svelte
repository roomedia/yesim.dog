<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { CompletedAt, Todo } from '../model/todo/Todo';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import Name from './Name.svelte';

	export let todo: Writable<Todo | null>;
	export let completedAt: Writable<CompletedAt | null>;
	export let placeholder: string;
</script>

<svelte:head>
	<title>그래 내가 🐶다</title>
	<meta name="description" content="그래 내가 🐶다" />
</svelte:head>

<section>
	<Name />
	<Button {todo} {completedAt} />
	<Input {todo} {completedAt} {placeholder} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
