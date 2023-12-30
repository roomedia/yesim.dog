import moment from "moment";

export class Todo {
    id: number | undefined;
    text: string;
    completedAt: string | null;
    userId: string;

    constructor(userId: string, id: number | undefined = undefined, text: string = '', completedAt: string | null = null) {
        this.userId = userId;
        this.id = id;
        this.text = text;
        this.completedAt = completedAt;
    }

    get hasText(): boolean {
        return this.text.length > 0;
    }

    get isCompleted(): boolean {
        return moment(this.completedAt).unix() > moment().startOf('day').unix();
    }
};
