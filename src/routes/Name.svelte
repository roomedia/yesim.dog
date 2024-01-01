<script lang="ts">
	import { page } from '$app/stores';
	import { makeDebouncer } from '$lib/debouncer';
	import { supabase } from '$lib/supabaseClient';
	import type { User } from '@supabase/supabase-js';
	import { getContext } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { Writable } from 'svelte/store';

	let textarea: HTMLTextAreaElement | undefined;
	const user: Writable<User | null | undefined> = getContext('user');
	const isMe: Writable<boolean> = getContext('isMe');
	const nickname: Writable<string> = getContext('nickname');

	const updateTextarea = (text: string) => {
		if (!textarea || textarea.value === text) {
			return;
		}
		textarea.value = text;
	};

	const insertInitialNickname = (userId: string) => {
		supabase
			.from('nickname')
			.insert({ userId, nickname: $user!.user_metadata.name })
			.select()
			.single()
			.then(({ data, error }) => {
				if (error) {
					console.error('nickname insert error:');
					console.error(error);
					toast.error('닉네임 초기화 실패..');
					return;
				}
				if (data) {
					nickname.set(data.nickname);
				}
			});
	};

	const getNickname = (userId: string) => {
		supabase
			.from('nickname')
			.select('nickname')
			.eq('userId', userId)
			.maybeSingle()
			.then(({ data, error }) => {
				if (textarea) {
					if (data) {
						nickname.set(data.nickname);
						updateTextarea(data.nickname);
						return;
					}
					if ($isMe) {
						nickname.set($user!.user_metadata.name);
						updateTextarea($user!.user_metadata.name);
						insertInitialNickname(userId);
					}
				}
				if (error) {
					console.error('nickname fetch error:');
					console.error(error);
					toast.error('사용자 정보 확인 실패..');
				}
			});
	};

	$: if ($page && $user !== undefined && textarea) {
		const userId = $page.url.searchParams.get('userId') ?? $user?.id;
		if (userId) {
			getNickname(userId);
		} else {
			textarea.value = '낯선이';
		}
	}

	const debouncer = makeDebouncer(async () => {
		if (!$user || !$isMe) {
			toast.error('로그인해야 닉네임을 변경할 수 있습니다!');
			return;
		}
		const { data, error } = await supabase
			.from('nickname')
			.update({ nickname: textarea?.value ?? $user.user_metadata.name })
			.eq('userId', $user.id)
			.select()
			.single();
		if (error) {
			console.error('nickname update error:');
			console.error(error);
			toast.error('닉네임 업데이트 실패..');
			return;
		}
		if (data) {
			nickname.set(data.nickname);
			toast.success('닉네임 업데이트 완료!');
		}
	});

	const handleInput = () => {
		debouncer();
	};
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
		color: var(--color-text);
		font-size: 2.1rem;
		font-weight: bold;
		margin-bottom: 0.1em;
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
