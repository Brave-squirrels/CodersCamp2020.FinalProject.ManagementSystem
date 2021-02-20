
export default interface Team {
    teamName: string,
    ownerId : string,
    members: object,
    projects: object,
    moderatorsId: string[],
    description: string,
    startDate: Date
}
