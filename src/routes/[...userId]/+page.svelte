<script lang="ts">
	import { page } from "$app/stores";
	import TodoPage from "./TodoPage.svelte";
</script>

<TodoPage todo={$page.data.todo} placeholder={$page.data.placeholder} />
