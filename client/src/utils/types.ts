export interface ProjectMember {
  id: string;
  name: string;
  role: string;
}
export interface UserProject {
  name: string;
  id: string;
  teamId: string;
}

export interface Invite {
  _id: string;
  teamId: string;
  teamName: string;
}
interface Project {
  projectName: string;
  projectId: string;
}

export interface Member {
  userId: string;
  userName: string;
}
export interface TeamData {
  _id: string;
  description: string;
  members: Member[];
  moderatorsId: string[];
  ownerId: string;
  pendingUsers: string[];
  projects: Project[];
  startDate: string;
  teamName: string;
}

export const baseTeamSetup: TeamData = {
  _id: '',
  description: "",
  members: [],
  moderatorsId: [],
  ownerId: "",
  pendingUsers: [],
  projects: [],
  startDate: "",
  teamName: "",
};

export interface UserTeam {
  id: string;
  name: string;
}
interface Owner {
  id: string;
  name: string;
}
interface Task {
  id: string;
  name: string;
}

interface Note {
  id: string;
  name: string;
}

export interface ProjectData {
  status: string;
  team: UserTeam;
  owner: Owner;
  projectName: string;
  deadline: string;
  members: ProjectMember[];
  tasks: Task[];
  note: Note[];
  date: string;
  content: string;
}

export const baseProjectSetup: ProjectData = {
  status: "",
  team: {
    id: "",
    name: "",
  },
  owner: { id: "", name: "" },
  projectName: "",
  deadline: "",
  date: '',
  members: [],
  tasks: [],
  note: [],
  content: '',
};

export interface TaskData {
  _id: string;
  status: string;
  commentsId: string[];
  projectId: string;
  name: string;
  content: string;
  deadlineDate: string;
  startDate: string;
  members: ProjectMember[];
}

export const baseTaskSetup: TaskData = {
  _id: '',
  status: '',
  commentsId: [],
  projectId: '',
  name: '',
  content: '',
  deadlineDate: '',
  startDate: '',
  members: [{id: '', name: '', role: ''},]
}

export interface NotesData {
  _id: string;
  content: string;
  projectId: string;
  name: string;
  author: Owner;
}

export const baseNotesSetup : NotesData = {
  _id: '',
  content: '',
  projectId: '',
  name: '',
  author: {
    id: '',
    name: ''
  }
}

export interface CommentData{
  _id: string;
  taskId: string;
  content: string;
  creator: {
    id: string;
    name: string;
  },
  date: string
}

export const baseCommentSetup : CommentData = {
  _id: '',
  taskId: '',
  content: '',
  creator: {
    id: '',
    name: '',
  },
  date: '',
}


export type TParams = { teamId: string; projectId: string };
