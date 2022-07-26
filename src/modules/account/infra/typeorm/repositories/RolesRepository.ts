import { IRolesRepository } from "@modules/account/repositories/IRolesRepository";
import { getRepository, Repository } from "typeorm";
import { Role } from "../entities/Role";

export class RolesRepository implements IRolesRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = getRepository(Role);
  }

  async findByIds(ids: string[]): Promise<Role[]> {
    const roles = await this.repository.findByIds(ids);
    return roles;
  }

  async findByPrivilege(privilege: string): Promise<Role> {
    const role = await this.repository.findOne({
      privilege,
    });
    return role;
  }
}
