<script lang="ts">
	import { getContext, onMount, setContext } from "svelte";
	import { type Writable } from "svelte/store";

    const todo = getContext<Writable<string | null>>("todo");
    const placeholder = getContext<Writable<string>>("placeholder");
    let textarea: HTMLTextAreaElement;
    let setTodoTimer: number | null = null;

	onMount(() => {
		handleResizeHeight();
        if ($todo) {
            textarea.value = $todo;
        }
	});

	const handleResizeHeight = () => {
		textarea.style.height = "auto";
		textarea.style.height = textarea.scrollHeight + "px";
	};

    const handleInput = () => {
        const setTodoDebounced = (todo: string, timeout: number = 750) => {
            if (setTodoTimer) {
                clearTimeout(setTodoTimer);
            }
            setTodoTimer = setTimeout(() => {
                fetch("api/todo", {
                    method: "POST",
                    body: JSON.stringify({ todo }),
                    headers: {
                        "x-sveltekit-action": "true",
                        "content-type": "application/json",
                    }
                });
            }, timeout);
        }

        todo.set(textarea.value);
        setTodoDebounced(textarea.value);
        handleResizeHeight();
    };
</script>

<h1>
    오늘부터<br>
    <textarea id="todo" rows="1" spellcheck="false" placeholder={$placeholder} bind:this={textarea} on:input={handleInput} /><br>
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
    font-size: 2.5rem;
    font-weight: bold;
}
</style>
