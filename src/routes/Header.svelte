<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import logo from '$lib/images/logo.png';
	import { supabase } from '$lib/supabaseClient';
	import type { User } from '@supabase/supabase-js';
	import { getContext } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { Writable } from 'svelte/store';

	const user: Writable<User | null | undefined> = getContext('user');

	const login = async () => {
		goto(base + '/login');
	};

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('error on logout');
			console.error(error);
			toast.error('로그아웃 실패..\n새로고침 후 다시 시도해주세요');
		}
		goto(window.location.href, { invalidateAll: true });
	};
</script>

<header>
	<div class="corner">
		<a data-sveltekit-reload href="{base}/">
			<img src={logo} alt="집으로" />
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
		padding: 0 1em;
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

	@media (min-width: 720px) {
		header {
			padding: 0 4em;
		}
	}
</style>
