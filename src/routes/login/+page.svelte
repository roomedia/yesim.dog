<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { supabase } from '$lib/supabaseClient';

	const basePage = base + '/';
	let previousPage: string = basePage;

	afterNavigate(({ from }) => {
		previousPage = from?.url?.toString() ?? basePage;
	});

	globalThis.handleSignInWithGoogle = async ({ credential }) => {
		await supabase.auth.signInWithIdToken({
			provider: 'google',
			token: credential,
			nonce: ''
		});
		goto(previousPage);
	};
</script>

<svelte:head>
	<title>로그인: 작심삼일 내가 🐶다</title>
	<meta name="description" content="로그인: 작심삼일 내가 🐶다" />
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<section>
	<div
		id="g_id_onload"
		data-client_id="846158167481-dr3nb4tjvinoet7hnas7oiab2nr0v5s6.apps.googleusercontent.com"
		data-context="use"
		data-ux_mode="popup"
		data-callback="handleSignInWithGoogle"
		data-nonce=""
		data-auto_prompt="false"
	></div>

	<div
		class="g_id_signin"
		data-type="standard"
		data-shape="rectangular"
		data-theme="outline"
		data-text="continue_with"
		data-size="large"
		data-logo_alignment="left"
	></div>
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
