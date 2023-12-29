import { json } from "@sveltejs/kit";

const placeholders = [
    "술마시면",
    "운동 안 하면",
    "다이어트 안 하면",
    "책 안 읽으면",
    "돈 많이 쓰면",
    "카드쓰면",
    "연애 못 하면",
    "늦게 자면",
    "밤새면",
    "늦잠자면",
    "지각하면",
    "담배피면",
    "공부안하면",
    "개쳐놀면",
    "숙제 안 하면",
    "벼락치기하면",
    "군것질하면",
    "유튜브보면",
    "여행 못 가면",
    "짜증내면",
    "욕하면",
    "밥안먹으면",
    "굶으면",
    "과식하면",
    "화내면",
    "울면",
    "콜라마시면",
    "게임하면",
    "몰컴하면",
    "과금하면",
    "가챠하면",
];

export const GET = async () => {
    const index = Math.floor(Math.random() * placeholders.length);
    return json({
        placeholder: placeholders[index],
    });
}
