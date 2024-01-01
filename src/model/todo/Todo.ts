import moment from "moment";

export class Todo {
    userId: string;
    id: number | undefined;
    text: string;

    constructor(userId: string, id: number | undefined = undefined, text: string = '') {
        this.userId = userId;
        this.id = id;
        this.text = text;
    }

    get hasText(): boolean {
        return this.text.length > 0;
    }
};

export class CompletedAt {
    userId: string | undefined;
    todoId: number | undefined;
    date: string;
    completedAt: string | null;

    constructor(userId: string | undefined, todoId: number | undefined, date: string = moment().startOf('day').format(), completedAt: string | null = null) {
        this.userId = userId;
        this.todoId = todoId;
        this.date = date;
        this.completedAt = completedAt;
    }

    get isCompleted(): boolean {
        return moment(this.completedAt).unix() > moment().startOf('day').unix();
    }
};

export class TodoWithCompletedAt {
    userId: string;
    todoId: number | undefined;
    text: string;
    date: string | null;
    completedAt: string | null;

    constructor(userId: string, todoId: number | undefined = undefined, text: string = '', date: string | null = null, completedAt: string | null = null) {
        this.userId = userId;
        this.todoId = todoId;
        this.text = text;
        this.date = date;
        this.completedAt = completedAt;
    }

    get hasText(): boolean {
        return this.text.length > 0;
    }

    get isCompleted(): boolean {
        return moment(this.completedAt).unix() > moment().startOf('day').unix();
    }
};
