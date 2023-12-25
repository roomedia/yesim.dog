import { tempTodo } from "../../+page.server";

export const POST = async ({ request }: any) => {
    const { todo } = await request.json();
    tempTodo.set(todo);
    return new Response();
}
