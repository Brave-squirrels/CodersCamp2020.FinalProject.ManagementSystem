import Member from "../interfaces/projectMember.interface";
export interface Task {
  projectId: string;
  name: string;
  content: string;
  deadlineDate: Date;
  startDate?: Date;
  status?: string;
  commentsId?: string[];
  members?: Member[];
}