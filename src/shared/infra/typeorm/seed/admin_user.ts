import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";
import createConnection from "../index";

import { Role } from "../../../../modules/account/infra/typeorm/entities/Role";
import { User } from "../../../../modules/account/infra/typeorm/entities/User";

async function create() {
  const connection = await createConnection("localhost");

  const userRepository = await connection.getRepository(User);
  const roleRepository = await connection.getRepository(Role);

  const password = await hash("admin", 8);
  const id = uuidV4();

  const user = userRepository.create({
    name: "AdminUser",
    email: "admin@mblabs.com.br",
    password: password,
    id: id,
  });

  const roleAdmin = await roleRepository.findOne({ privilege: "admin" });
  const roleCostumer = await roleRepository.findOne({ privilege: "costumer" });

  if (!roleAdmin && !roleCostumer) {
    console.log("Role not found");
  }

  user.roles = [roleAdmin, roleCostumer];

  await userRepository.save(user);

  await connection.close;
}

create().then(() => console.log("User admin created!"));
