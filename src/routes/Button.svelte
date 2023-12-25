<script lang="ts">
	import { getContext } from "svelte";
	import Counter from "./Counter.svelte";
	import { type Writable, writable } from "svelte/store";
	import { type Todo } from "./Todo";

    const todo = getContext<Writable<Todo>>("todo");
    const isCompleted = writable<boolean>();
    $: isCompleted.set($todo.isCompleted);

    const toggleComplete = async () => {
        if ($todo.text.length <= 0) {
            return;
        }
        todo.set({
            text: $todo.text,
            isCompleted: !$isCompleted,
        });
        fetch("api/todo/complete", {
            method: "POST",
            body: JSON.stringify({ isCompleted: $isCompleted }),
            headers: {
                "x-sveltekit-action": "true",
                "content-type": "application/json",
            },
        })
    }
</script>

<button on:click={toggleComplete}>
    <span class="emoji {$isCompleted ? '' : 'gone'}" id="success">😊</span>
    <span class="emoji {$isCompleted ? 'gone' : ''}" id="failed">🐶</span>
    <Counter />
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