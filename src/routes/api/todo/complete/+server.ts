import { tempTodo } from "../../../+page.server";
import { Todo } from "../../../Todo";
import type { RequestEvent } from "./$types";

export const POST = async ({ request }: RequestEvent) => {
    const { completedAt } = await request.json();
    tempTodo.update((todo) => new Todo(todo.text, completedAt));
    return new Response();
}
