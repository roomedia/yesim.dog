<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { error } from '@sveltejs/kit';
	import { writable, type Writable } from 'svelte/store';
	import { CompletedAt, Todo } from '../model/todo/Todo';
	import TodoPage from './TodoPage.svelte';

	const getTodoByUserId = async (userId: string) => {
		const { data, error: exception } = await supabase
			.from('todo')
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
			return new Todo(todo.userId, todo.id, todo.text);
		} else {
			return null;
		}
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
		const { data } = await supabase
			.from('todo')
			.insert(new Todo(userId))
			.select()
			.returns<Todo[]>()
			.single();
		return data;
	};

	const getTodo = async (userIdParams: string | null) => {
		if (userIdParams) {
			return await getTodoByUserId(userIdParams);
		}
		const userId = await getUserId();
		if (userId) {
			return await getTodoByUserId(userId) ?? insertTodo(userId);
		}
		return null;
	};

	const getCompletedAtByTodo = async (todo: Todo) => {
		const { data, error: exception } = await supabase
			.from('completedAt')
			.select('*')
			.eq('userId', todo.userId)
			.eq('todoId', todo.id!)
			.limit(1);
		if (exception) {
			console.error('getTodoByUserId error:');
			console.error(exception);
			error(404, todo.userId + ' 사용자가 없습니다.');
		}
		const completedAt = data?.at(0);
		if (completedAt) {
			return new CompletedAt(
				completedAt.userId,
				completedAt.todoId,
				completedAt.date,
				completedAt.completedAt
			);
		} else {
			return null;
		}
	};

	const getCompletedAt = async (todo: Todo) => {
		if (todo.userId !== '' && todo.id) {
			return await getCompletedAtByTodo(todo);
		}
		return null;
	};

	const todo: Writable<Todo | null> = writable();
	const completedAt: Writable<CompletedAt | null> = writable();
	$: {
		getTodo($page.url.searchParams.get('userId'))
		.then((value) => {
			todo.set(value);
			if (value) {
			getCompletedAt(value).then((value) => completedAt.set(value));
			} else {
				completedAt.set(null)
			}
		});
	}
</script>

<TodoPage {todo} {completedAt} placeholder={$page.data.placeholder} />
