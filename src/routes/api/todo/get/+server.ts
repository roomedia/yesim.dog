import moment from "moment";
import { Todo } from "../../../../model/todo/Todo";
import { get, writable } from "svelte/store";
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export const _todos = new Map([
    ["1", new Todo("1", moment().unix())],
    ["2", new Todo("2", null)],
    ["3", new Todo("3", moment().unix() - 100)],
]);
export const _tempTodo = writable(new Todo());

export const POST = async ({ request }: RequestEvent) => {
    const { userId } = await request.json();
    const todo = (userId === undefined) ? get(_tempTodo) : _todos.get(userId);
    if (todo === undefined) {
        return json({});
    }
    return json({ 
        todo: {
            ...todo,
            hasText: todo.hasText,
            isCompleted: todo.isCompleted,
        }
    });
}
