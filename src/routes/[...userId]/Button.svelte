<script lang="ts">
	import Counter from "./Counter.svelte";
	import { writable } from "svelte/store";
	import moment from "moment";
	import { Todo } from "../../model/todo/Todo";

    export let todo: Todo;
    const _todo = writable<Todo>();
    $: _todo.set(todo);

    const toggleComplete = async () => {
        if (!$_todo.hasText) {
            return;
        }
        const completedAt: number | null = ($_todo.isCompleted) ? null : moment().unix();
        _todo.update((old) => new Todo(old.text, completedAt));
        fetch("api/todo/complete", {
            method: "POST",
            body: JSON.stringify({ completedAt }),
            headers: {
                "x-sveltekit-action": "true",
                "content-type": "application/json",
            },
        })
    }
</script>

<button on:click={toggleComplete}>
    <span class="emoji {$_todo.isCompleted ? '' : 'gone'}" id="success">😊</span>
    <span class="emoji {$_todo.isCompleted ? 'gone' : ''}" id="failed">🐶</span>
    <Counter todo={$_todo}/>
</button>

<style>
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