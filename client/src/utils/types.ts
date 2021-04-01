

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
  id: string;
  name: string;
}
interface Project {
  projectName: string;
  projectId: string;
}

interface Member {
  userId: string;
  userName: string;
}
export interface TeamData {
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
deadline: string;
startData: string
}

export const baseTaskSetup: TaskData = {
  _id: '',
  status: '',
  commentsId: [],
  projectId: '',
  name: '',
  content: '',
  deadline: '',
  startData: '',
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


export type TParams = { teamId: string; projectId: string };
