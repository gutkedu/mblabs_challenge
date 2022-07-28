import { ICreateRoleDTO } from "@modules/account/dtos/ICreateRoleDTO";
import { Role } from "@modules/account/infra/typeorm/entities/Role";
import { IRolesRepository } from "../IRolesRepository";

export class RolesRepositoryInMemory implements IRolesRepository {
  roles: Role[] = [];

  async create({ privilege, description }: ICreateRoleDTO): Promise<Role> {
    const role = new Role();

    Object.assign(role, { privilege, description });

    this.roles.push(role);

    return role;
  }

  async findByIds(ids: string[]): Promise<Role[]> {
    throw new Error("Method not implemented.");
  }
  async findByPrivilege(privilege: string): Promise<Role> {
    return this.roles.find((role) => role.privilege === privilege);
  }
}
