import { ICreateRoleDTO } from "../dtos/ICreateRoleDTO";
import { Role } from "../infra/typeorm/entities/Role";

export interface IRolesRepository {
  findByIds(ids: string[]): Promise<Role[]>;
  findByPrivilege(privilege: string): Promise<Role>;
  create(data: ICreateRoleDTO): Promise<Role>;
}
