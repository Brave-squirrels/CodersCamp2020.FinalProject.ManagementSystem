export enum STATUS {
    INPROGRESS = "InProgress",
    DONE = "Done",
    ABANDONED = "ABANDONED"
}

export interface Project {
    projectName: string,
    teamId: string,
    ownerId: string,
    date?: Date,
    status?: STATUS,
    normalUsersId?: string[],
    designersId?: string[],
    backendDevsId?: string[],
    frontendDevsId?: string[]
    scrumMasterId?: string,
    qaEngineerId?: string
}
