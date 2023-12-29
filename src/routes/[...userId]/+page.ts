import { error, type RequestEvent } from "@sveltejs/kit";
import { writable } from "svelte/store";
import { Todo } from "../../model/todo/Todo";

export const load = async (event: RequestEvent) => {
    const userId = event.params.userId;
    const getTodo = await event.fetch("api/todo/get", {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
            "x-sveltekit-action": "true",
            "content-type": "application/json",
        },
    });
    const { todo } = await getTodo.json();
    if (todo === undefined) {
        error(404, userId + " 사용자가 없습니다.");
    }

    const getPlaceholder = await event.fetch("api/placeholder", {
        method: "GET",
        headers: {
            "x-sveltekit-action": "true",
            "content-type": "application/json",
        },
    });
    const { placeholder } = await getPlaceholder.json();
    return {
        todo: writable<Todo>(todo),
        placeholder,
    };
}
