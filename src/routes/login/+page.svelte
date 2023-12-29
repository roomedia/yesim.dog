<script lang="ts">
	import google from '$lib/images/google-login.svg';
	import { supabase } from '$lib/supabaseClient';

	const googleOAuth = async () => {
		supabase.auth.signInWithOAuth({
			provider: 'google'
		});
	};
</script>

<svelte:head>
	<title>로그인: 작심삼일 내가 🐶다</title>
	<meta name="description" content="로그인: 작심삼일 내가 🐶다" />
</svelte:head>

<section>
	<button on:click={googleOAuth}>
		<img src={google} alt="구글 로그인" />
	</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	button {
		height: 2.5em;
		display: inline-block;
	}
</style>
