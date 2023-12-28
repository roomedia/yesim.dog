<script lang="ts">
	import type { Todo } from "../../model/todo/Todo";
	import Button from "./Button.svelte";
	import Input from "./Input.svelte";

	export let todo: Todo;
	export let placeholder: string;
</script>

<svelte:head>
	<title>디독: 작심삼일 내가 🐶다</title>
	<meta name="description" content="디독: 작심삼일 내가 🐶다" />
</svelte:head>

<section>
	<Button {todo} />
	<Input {todo} {placeholder} />
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
