<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/d-dog-logo.png';
</script>

<header>
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<div class="corner">
		<button>로그인하여 공유</button>
	</div>
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
</style>
