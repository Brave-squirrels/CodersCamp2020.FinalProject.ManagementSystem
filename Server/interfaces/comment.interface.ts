export interface Comment {
    taskId: string[],
    content: string,
    creatorId: string,
    creatorName: string,
    date?: Date
}