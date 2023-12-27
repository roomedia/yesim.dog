import { Todo } from "../../../../model/todo/Todo";
import { _tempTodo } from "../get/+server";
import type { RequestEvent } from "./$types";

export const POST = async ({ request }: RequestEvent) => {
    const { todo } = await request.json();
    _tempTodo.set(new Todo(todo));
    return new Response();
}
