import CommentCreator from './commentCreatorInterface.interface';
export interface Comment {
    taskId: string[],
    content: string,
    creator: CommentCreator,
    date?: Date
}