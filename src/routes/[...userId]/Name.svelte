<script lang="ts">
	import type { User } from '@supabase/supabase-js';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let textarea: HTMLTextAreaElement | undefined;
	const user: Writable<User | undefined> = getContext('user');
	$: if (textarea) {
		textarea.value = $user?.user_metadata.name.substr(0, 10) ?? '';
	}

	const isMe: Writable<boolean> = getContext('isMe');

	const handleInput = () => {};
</script>

<textarea
	id="name"
	spellcheck="false"
	maxlength="10"
	disabled={!$isMe}
	class={$isMe ? 'editable' : ''}
	bind:this={textarea}
	on:input={handleInput}
/>

<style>
	#name {
		height: 53px;
		border: 0px;
		margin: 0 0 0.5em 0;
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
		#name {
			font-size: 2.5rem;
		}
	}

	.editable {
		text-decoration: underline wavy var(--color-theme-1);
	}
</style>
