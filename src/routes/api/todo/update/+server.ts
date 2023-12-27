import { tempTodo } from "../../../+page.server";
import { Todo } from "../../../Todo";
import type { RequestEvent } from "./$types";

export const POST = async ({ request }: RequestEvent) => {
    const { todo } = await request.json();
    tempTodo.set(new Todo(todo));
    return new Response();
}
