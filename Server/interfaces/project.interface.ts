enum STATUS {
    INPROGRESS = "InProgress",
    DONE = "Done",
    ABANDONED = "ABANDONED"
}

export default interface Project {
    name: string,
    teamId: string,
    date?: Date,
}
