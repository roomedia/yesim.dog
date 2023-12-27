import moment from "moment";

export class Todo {
    text: string;
    completedAt: number | null;

    constructor(text: string = "", completedAt: number | null = null) {
        this.text = text;
        this.completedAt = completedAt;
    }

    get hasText(): boolean {
        return this.text.length > 0;
    }

    get isCompleted(): boolean {
        return (this.completedAt ?? 0) > moment().startOf('day').unix();
    }
};
