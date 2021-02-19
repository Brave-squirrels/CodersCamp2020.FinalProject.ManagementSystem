
export default interface Team {
    teamName: string,
    ownerId : string,
    usersId: string[],
    projectsId: string[],
    usersWithPermissions: string[]
}
