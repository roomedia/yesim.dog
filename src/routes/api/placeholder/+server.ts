import { json } from "@sveltejs/kit";

const placeholders = ["술마시면", "운동안하면", "담배피면", "공부안하면", "군것질하면", "유튜브보면"];

export const GET = async () => {
    const index = Math.floor(Math.random() * placeholders.length);
    return json({
        placeholder: placeholders[index],
    });
}
