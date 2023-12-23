<script>
	import { onMount } from "svelte";
	import Counter from "./Counter.svelte";

	/**
	 * @type {HTMLTextAreaElement}
	 */
	let textarea;
	let placeholder = "술마시면"; // todo: replace with diverse string

	onMount(() => {
		handleResizeHeight();
	})

	const handleResizeHeight = () => {
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	};
</script>

<svelte:head>
	<title>디독: 작심삼일 내가 🐶다</title>
	<meta name="description" content="디독: 작심삼일 내가 🐶다" />
</svelte:head>

<section>
    <Counter hasToDo={true} />

	<h1>
		오늘부터<br>
		<textarea id="todo" rows="1" spellcheck="false" placeholder={placeholder} bind:this={textarea} on:input={handleResizeHeight} /><br>
		내가 🐶다
	</h1>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

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
		font-size: 2.5rem;
		font-weight: bold;
	}
</style>
