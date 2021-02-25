import members from "./teamMembers.interface";

export default interface Team {
  teamName: string;
  ownerId: string;
  members: members[];
  pendingUsers: string[];
  projects: Array<any>;
  moderatorsId: string[];
  description: string;
  startDate: Date;
}
