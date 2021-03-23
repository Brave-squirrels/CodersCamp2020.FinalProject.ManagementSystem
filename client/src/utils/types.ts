interface Member {
    userId: string;
    userName: string;
  }
  
  interface Project {
    projectName: string;
    projectId: string;
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
  
  export type TParams = { teamId: string };