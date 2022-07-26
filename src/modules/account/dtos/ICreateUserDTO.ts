import { Role } from "../infra/typeorm/entities/Role";

export interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  id?: string;
  roles?: Role[];
}
