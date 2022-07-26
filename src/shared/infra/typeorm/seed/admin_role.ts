import { v4 as uuidV4 } from "uuid";
import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();

  await connection.query(
    `INSERT INTO ROLES(id, privilege, description, updated_at, created_at)
      values('${id}', 'admin', 'Privilégio de administrador do sistema','now()', 'now()');
    `
  );

  await connection.close;
}

create().then(() => console.log("Role admin created!"));
