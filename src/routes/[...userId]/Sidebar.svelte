<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import type { User } from '@supabase/supabase-js';
	import ClipboardJS from 'clipboard';
	import { getContext } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import type { Writable } from 'svelte/store';
	import type { Todo } from '../../model/todo/Todo';

	export let todo: Writable<Todo>;
	const user: Writable<User | null | undefined> = getContext('user');
	let userId: string | undefined;
	$: if ($user !== undefined) {
		userId = $page.params.userId ?? $user?.id;
	}
	let clipboardText: string | undefined = undefined;
	$: if (userId) {
		const template = '오늘부터 ' + $todo.text + ' 내가 개다\n' + $page.url.origin + '/' + userId;
		supabase
			.from('nickname')
			.select('nickname')
			.eq('userId', userId)
			.maybeSingle()
			.then(({ data, error }) => {
				if (data) {
					clipboardText = data.nickname + '님의 다짐!\n' + template;
					return;
				}
				if (error) {
					console.error('nickname fetch error:');
					console.error(error);
					toast.error('사용자 정보 확인 실패..');
				}
			});
	} else {
		clipboardText = undefined;
	}
	new ClipboardJS('#share');

	const surf = async () => {
		const request = supabase.from('randomUsers').select('id');
		if ($user) {
			request.neq('id', $user.id);
		}
		if ($page.params.userId) {
			request.neq('id', $page.params.userId);
		}
		const { data, error } = await request.limit(1).maybeSingle();
		if (error) {
			console.error('surf error');
			console.error(error);
			toast.error('파도타기 실패! 잠시 후 다시 시도해주세요..');
			return;
		}
		if (data) {
			goto(data.id);
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

<Toaster />
<aside>
	<ul>
		<li><button id="surf" on:click={surf}>🌊</button></li>
		<li>
			<button id="share" on:click={share} data-clipboard-text={clipboardText ?? ''}>🌊</button>
		</li>
	</ul>
</aside>

<style>
	aside {
		margin-left: -5.65em;
		margin-right: 1em;
	}

	ul {
		list-style-type: none;
		margin-block: 0;
		margin-inline: 0;
		padding-inline: 0;
		padding: 0.5em;
		border-radius: 1.75em;
		border: 0.1px solid var(--color-sidebar);
	}

	li {
		font-size: 2em;
		width: 1.5em;
		height: 1.5em;
		cursor: pointer;
		border: 0.1px solid var(--color-sidebar);
		border-radius: 0.5em;
		margin-bottom: 0.1em;
		display: flex;
		justify-content: center;
	}

	li:last-child {
		margin-bottom: 0;
	}

	button {
		width: 100%;
		height: 100%;
		padding: 0 0.1em;
		background-color: transparent;
	}
</style>
