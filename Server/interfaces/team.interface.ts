
export default interface Team {
    teamName: string,
    ownerId : string,
    members: object,
    pendingUsers: [],
    projects: [],
    moderatorsId: string[],
    description: string,
    startDate: Date
}
