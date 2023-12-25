<script lang="ts">
	import Button from "./Button.svelte";
	import Input from "./Input.svelte";
</script>

<svelte:head>
	<title>디독: 작심삼일 내가 🐶다</title>
	<meta name="description" content="디독: 작심삼일 내가 🐶다" />
</svelte:head>

<section>
	<Button />
	<Input />
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
