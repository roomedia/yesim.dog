import { supabase } from "$lib/supabaseClient";
import { error, type RequestEvent } from "@sveltejs/kit";
import { writable } from "svelte/store";
import { Todo } from "../../model/todo/Todo";

export const csr = true;
export const ssr = false;

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

const placeholders = [
    "술마시면",
    "운동 안 하면",
    "다이어트 안 하면",
    "책 안 읽으면",
    "돈 많이 쓰면",
    "카드쓰면",
    "연애 못 하면",
    "늦게 자면",
    "밤새면",
    "늦잠자면",
    "지각하면",
    "담배피면",
    "공부안하면",
    "개쳐놀면",
    "숙제 안 하면",
    "벼락치기하면",
    "군것질하면",
    "유튜브보면",
    "여행 못 가면",
    "짜증내면",
    "욕하면",
    "밥안먹으면",
    "굶으면",
    "과식하면",
    "화내면",
    "울면",
    "콜라마시면",
    "게임하면",
    "몰컴하면",
    "과금하면",
    "가챠하면",
];

const getPlaceholder = async (event: RequestEvent) => {
    const index = Math.floor(Math.random() * placeholders.length);
    return placeholders[index];
}

export const load = async (event: RequestEvent) => {
    return {
        todo: writable(await getTodo(event)),
        placeholder: await getPlaceholder(event),
    };
}
