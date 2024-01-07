<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import type { User } from '@supabase/supabase-js';
	import { getContext } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { Writable } from 'svelte/store';
	import type { Todo } from '../model/todo/Todo';
	import { base } from '$app/paths';

	export let todo: Writable<Todo | null>;
	const user: Writable<User | null | undefined> = getContext('user');
	const nickname: Writable<string> = getContext('nickname');
	let userId: string | undefined;
	$: if ($user !== undefined) {
		userId = $page.url.searchParams.get('userId') ?? $user?.id;
	}
	let clipboardText: string | undefined = undefined;
	$: {
		if (userId) {
			const template =
				'오늘부터 ' +
				($todo?.text ?? '그냥') +
				' 내가 개다\n' +
				$page.url.origin +
				base +
				'/?userId=' +
				userId;
			clipboardText = $nickname + '님의 다짐!\n' + template;
		} else {
			clipboardText = undefined;
		}
	}

	const gotoUserId = (userId: string | null | undefined) => {
		if (userId) {
			goto(base + '/?userId=' + userId);
		} else {
			goto(base);
		}
	};

	const home = () => {
		gotoUserId($user?.id);
	};

	const surf = async () => {
		const request = supabase.from('randomUsers').select('id');
		if ($user) {
			request.neq('id', $user.id);
		}
		const userIdParams = $page.url.searchParams.get('userId');
		if (userIdParams) {
			request.neq('id', userIdParams);
		}
		const { data, error } = await request.limit(1).maybeSingle();
		if (error) {
			console.error('surf error');
			console.error(error);
			toast.error('파도타기 실패! 잠시 후 다시 시도해주세요..');
			return;
		}
		if (data) {
			gotoUserId(data.id);
		} else {
			toast.error('파도타기 실패! 더 이상 갈 곳이 없어요..');
		}
	};

	const share = () => {
		if (userId) {
			toast.success('링크가 클립보드에 복사되었습니다!');
		} else {
			toast.error('내 다짐은 로그인해야 공유할 수 있습니다!');
		}
	};
</script>

<!-- svelte-ignore missing-declaration -->
<svelte:head>
	<script
		src="https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js"
		async
		defer
		on:load={() => {
			new ClipboardJS('#share');
		}}
	></script>
</svelte:head>

<aside>
	<ul>
		<li><button id="home" on:click={home} title="집으로"></button></li>
		<li><button id="surf" on:click={surf} title="파도타기"></button></li>
		<li>
			<button id="share" on:click={share} title="공유하기" data-clipboard-text={clipboardText ?? ''}
			></button>
		</li>
	</ul>
</aside>

<style>
	ul {
		list-style-type: none;
		margin-block: 0;
		margin-inline: 0;
		padding-inline: 0;
		padding: 0.5em;
		border-radius: 0.75em;
		border: 0.1px solid var(--color-border);
		display: inline-block;
	}

	li {
		font-size: 2em;
		width: 1.5em;
		height: 1.5em;
		cursor: pointer;
		border: 0.1px solid var(--color-border);
		border-radius: 0.25em;
		margin-bottom: 0.1em;
		display: inline-block;
		justify-content: center;
	}

	li:last-child {
		margin-bottom: 0;
	}

	button {
		width: 100%;
		height: 100%;
		background-size: cover;
	}

	#home {
		background-image: url($lib/images/home.png);
	}

	#surf {
		background-image: url($lib/images/surf.png);
	}

	#share {
		background-image: url($lib/images/share.png);
	}
	@media (min-width: 720px) {
		aside {
			margin-left: -5.25em;
			margin-right: 1em;
		}

		ul {
			display: block;
		}

		li {
			display: block;
		}
	}
</style>
