export enum STATUS {
  INPROGRESS = "InProgress",
  DONE = "Done",
  ABANDONED = "Abandoned",
}

export interface Project {
  projectName: string;
  team: string;
  owner: string;
  date?: Date;
  status?: STATUS;
  normalUsers?: string[];
  designers?: string[];
  backendDevs?: string[];
  frontendDevs?: string[];
  scrumMaster?: string;
  qaEngineer?: string;
}
