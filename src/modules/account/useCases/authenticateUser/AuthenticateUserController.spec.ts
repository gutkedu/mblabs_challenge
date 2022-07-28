import { Connection } from "typeorm";
import createConnection from "@shared/infra/typeorm";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";
import request from "supertest";
import { app } from "@shared/infra/http/app";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { Role } from "@modules/account/infra/typeorm/entities/Role";

let connection: Connection;

describe("authenticate user controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const id2 = uuid();
    const password = await hash("password", 8);

    const userRepository = await connection.getRepository(User);
    const roleRepository = await connection.getRepository(Role);

    const user = userRepository.create({
      name: "user",
      email: "user@teste.com",
      password: password,
      id: id,
    });

    await connection.query(
      `INSERT INTO ROLES(id, privilege, description, updated_at, created_at)
        values('${id2}', 'costumer', 'Privilégio de cliente do sistema','now()', 'now()');
      `
    );

    const roleCostumer = await roleRepository.findOne({
      privilege: "costumer",
    });

    user.roles = [roleCostumer];

    await userRepository.save(user);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to authenticate a user", async () => {
    const response = await request(app).post("/login").send({
      email: "user@teste.com",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("refresh_token");
  });
});
