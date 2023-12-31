<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import logo from '$lib/images/d-dog-logo.png';
	import { supabase } from '$lib/supabaseClient';
	import type { User } from '@supabase/supabase-js';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const user: Writable<User | null | undefined> = getContext('user');

	const login = async () => {
		goto('login');
	};

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			alert(error);
		}
	};
</script>

<header>
	<div class="corner">
		<a data-sveltekit-reload href="/">
			<img src={logo} alt="yesim.dog" />
		</a>
	</div>

	{#if $page.route.id !== '/login'}
		<div class="corner">
			{#if $user}
				<button on:click={logout}>로그아웃</button>
			{:else}
				<button on:click={login}>로그인</button>
			{/if}
		</div>
	{/if}
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 0 3em;
	}

	.corner {
		display: flex;
		align-items: center;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		height: 2em;
		object-fit: contain;
	}

	.corner button {
		padding: 0 1em;
	}
</style>
