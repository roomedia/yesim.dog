import { supabase } from "$lib/supabaseClient";
import { error, type RequestEvent } from "@sveltejs/kit";
import { Todo } from "../../model/todo/Todo";
import { writable } from "svelte/store";

const getTodoByUserId = async (userId: string) => {
    const { data, error: exception } = await supabase.from('todos')
        .select("*")
        .eq('userId', userId)
        .returns<Todo[]>()
        .limit(1);
    if (exception) {
        console.log("getTodoByUserId error: " + exception);
        error(404, userId + " 사용자가 없습니다.");
    }
    return data?.at(0);
}

const getDefaultTodo = (userId: string = '') => {
    return new Todo(userId);
}

const getUserId = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.log("getUserId error: " + error);
    }
    return data.session?.user.id;
}

const insertTodo = (userId: string) => {
    supabase.from('todos').insert(getDefaultTodo(userId));
}

const getTodo = async (event: RequestEvent) => {
    if (event.params.userId) {
        return getTodoByUserId(event.params.userId) ?? getDefaultTodo(event.params.userId);
    }
    const userId = await getUserId();
    if (userId) {
        const todo = await getTodoByUserId(userId);
        if (!todo) {
            insertTodo(userId);
        }
        return todo ?? getDefaultTodo(userId);
    }
    return getDefaultTodo('');
}

const getPlaceholder = async (event: RequestEvent) => {
    const getPlaceholder = await event.fetch("api/placeholder", {
        method: "GET",
        headers: {
            "x-sveltekit-action": "true",
            "content-type": "application/json",
        },
    });
    const { placeholder } = await getPlaceholder.json();
    return placeholder;
}

export const load = async (event: RequestEvent) => {
    return {
        todo: writable(await getTodo(event)),
        placeholder: await getPlaceholder(event),
    };
}
