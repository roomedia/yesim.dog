import { get, writable } from "svelte/store";
import type { Todo } from "./Todo";

export const tempTodo = writable<Todo>({
    text: "",
    isCompleted: false,
});

const getTodo = async () => {
    return get(tempTodo);
}

const defaultTodos = ["술마시면", "운동안하면", "담배피면", "공부안하면", "군것질하면", "유튜브보면"];

const randomTodo = () => {
    const index = Math.floor(Math.random() * defaultTodos.length);
    return defaultTodos[index];
}

export const load = async () => {
    return {
        todo: await getTodo(),
        placeholder: randomTodo(),
    };
}
