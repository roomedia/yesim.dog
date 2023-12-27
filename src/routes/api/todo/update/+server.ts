import { get } from "svelte/store";
import { tempTodo } from "../../../+page.server";
import { Todo } from "../../../Todo";

export const POST = async ({ request }: any) => {
    const { todo } = await request.json();
    tempTodo.set(new Todo(todo));
    return new Response();
}
