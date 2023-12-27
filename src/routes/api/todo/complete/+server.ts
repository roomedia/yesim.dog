import { get } from "svelte/store";
import { tempTodo } from "../../../+page.server";
import { Todo } from "../../../Todo";

export const POST = async ({ request }: any) => {
    const { completedAt } = await request.json();
    tempTodo.update((todo) => new Todo(todo.text, completedAt));
    return new Response();
}
