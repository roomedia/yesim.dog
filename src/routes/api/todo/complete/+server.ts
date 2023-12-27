import { Todo } from "../../../../model/todo/Todo";
import { _tempTodo } from "../get/+server";
import type { RequestEvent } from "./$types";

export const POST = async ({ request }: RequestEvent) => {
    const { completedAt } = await request.json();
    _tempTodo.update((todo) => new Todo(todo.text, completedAt));
    return new Response();
}
