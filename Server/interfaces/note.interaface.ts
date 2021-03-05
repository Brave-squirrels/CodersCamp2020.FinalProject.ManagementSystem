interface Author {
  id: string,
  name: string
}

export default interface Note {
  name: string;
  projectId?: string;
  content?: string;
  author?: Author;
  date?: string;
}
