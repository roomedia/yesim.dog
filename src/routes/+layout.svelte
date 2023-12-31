<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import type { Session, User } from '@supabase/supabase-js';
	import { onMount, setContext } from 'svelte';
	import { Toaster } from 'svelte-french-toast';
	import { writable } from 'svelte/store';
	import Header from './Header.svelte';
	import './styles.css';

	const user = writable<User | null | undefined>(undefined);
	const isMe = writable<boolean>();
	const nickname = writable<string>();
	$: {
		const userId = $page.url.searchParams.get('userId');
		isMe.set(!userId || $user?.id === userId);
	}
	setContext('user', user);
	setContext('isMe', isMe);
	setContext('nickname', nickname);

	const setUser = (session: Session | null) => {
		const newUser = session?.user ?? null;
		if ($user !== newUser) {
			user.set(newUser);
		}
	};

	onMount(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session);
		});

		const {
			data: { subscription: authListener }
		} = supabase.auth.onAuthStateChange((_, session) => {
			setUser(session);
		});

		return () => {
			authListener?.unsubscribe();
		};
	});
</script>

<div class="app">
	<Toaster />
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
