<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { error } from '@sveltejs/kit';
	import { writable, type Writable } from 'svelte/store';
	import { Todo } from '../model/todo/Todo';
	import TodoPage from './TodoPage.svelte';

	const getTodoByUserId = async (userId: string) => {
		const { data, error: exception } = await supabase
			.from('todos')
			.select('*')
			.eq('userId', userId)
			.limit(1);
		if (exception) {
			console.error('getTodoByUserId error:');
			console.error(exception);
			error(404, userId + ' 사용자가 없습니다.');
		}
		const todo = data?.at(0);
		if (todo) {
			return new Todo(todo.userId, todo.id, todo.text, todo.completedAt);
		} else {
			return undefined;
		}
	};

	const getDefaultTodo = (userId: string = '') => {
		return new Todo(userId);
	};

	const getUserId = async () => {
		const { data, error } = await supabase.auth.getSession();
		if (error) {
			console.error('getUserId error:');
			console.error(error);
		}
		return data.session?.user.id;
	};

	const insertTodo = async (userId: string) => {
		await supabase.from('todos').insert(getDefaultTodo(userId));
	};

	const getTodo = async () => {
		const userIdParams = $page.url.searchParams.get('userId');
		if (userIdParams) {
			return (await getTodoByUserId(userIdParams)) ?? getDefaultTodo(userIdParams);
		}
		const userId = await getUserId();
		if (userId) {
			const todo = await getTodoByUserId(userId);
			if (!todo) {
				await insertTodo(userId);
			}
			return todo ?? getDefaultTodo(userId);
		}
		return getDefaultTodo('');
	};

	const todo: Writable<Todo | undefined> = writable();
	$: getTodo().then((value) => todo.set(value));
</script>

<TodoPage {todo} placeholder={$page.data.placeholder} />
