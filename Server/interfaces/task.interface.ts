import Member from "../interfaces/projectMember.interface";
export interface Task {
  projectID: string;
  name: string;
  content: string;
  deadlineDate: Date;
  startDate?: Date;
  status?: string;
  commentsID?: string[];
  usersID?: Member[];
}
