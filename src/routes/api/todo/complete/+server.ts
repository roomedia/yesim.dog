import { tempTodo } from "../../../+page.server";

export const POST = async ({ request }: any) => {
    const { isCompleted } = await request.json();
    tempTodo.update((todo) => {
        return {
            text: todo.text,
            isCompleted: isCompleted,
        };
    });
    return new Response();
}
