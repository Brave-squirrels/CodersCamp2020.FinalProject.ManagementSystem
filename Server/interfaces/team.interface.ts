
export default interface Team {
    teamName: string,
    ownerId : string,
    members: [],
    pendingUsers: [],
    projects: [],
    moderatorsId: string[],
    description: string,
    startDate: Date
}
