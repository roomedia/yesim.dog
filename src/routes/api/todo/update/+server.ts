import { tempTodo } from "../../../+page.server";

export const POST = async ({ request }: any) => {
    const { todo } = await request.json();
    tempTodo.set({
        text: todo,
        isCompleted: false,
    });
    return new Response();
}
