import Member from "../interfaces/projectMember.interface";
import TaskSTATUS from '../enums/taskStatus';
export interface Task {
  projectId: string;
  name: string;
  content: string;
  deadlineDate: Date;
  startDate?: Date;
  status?: TaskSTATUS;
  commentsId?: string[];
  members?: Member[];
}