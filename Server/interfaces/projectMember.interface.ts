import ROLES from "../enums/projectRoles";

export default interface Member {
  name: string;
  role: ROLES;
  id: string;
}
