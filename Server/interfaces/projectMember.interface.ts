import ROLE from '../enums/projectRoles';
export default interface Member {
  id: string;
  role: ROLE;
  name: string;
}
