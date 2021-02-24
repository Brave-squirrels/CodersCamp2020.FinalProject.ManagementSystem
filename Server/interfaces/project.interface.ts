import STATUS from "../enums/projectStatus";
import Member from "./projectMember.interface";

export interface Project {
  projectName: string;
  deadline: Date;
  owner: {
    id: string,
    name: string
  };
  team: {
    id: string,
    name: string
  };
  members?: Member[];
  content?: string;
  status?: STATUS;
  tasks?: string[],
  notes?: string[]
  date?: Date;
}
