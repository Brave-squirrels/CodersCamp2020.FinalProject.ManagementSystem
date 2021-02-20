import STATUS from '../enums/projectStatus';
import Member from './projectMember.interface';


export interface Project {
    projectName: string,
    owner: string,
    team: string,
    members?: Member[]
    status?: STATUS,
    date?: Date,
}
