import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { RolesRepositoryInMemory } from "@modules/account/repositories/in-memory/RolesRepositoryInMemory";
import { UserRepositoryInMemory } from "@modules/account/repositories/in-memory/UserRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/account/repositories/in-memory/UserTokenRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/infra/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let rolesRepositoryInMemory: RolesRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("authenticate user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    rolesRepositoryInMemory = new RolesRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(
      userRepositoryInMemory,
      rolesRepositoryInMemory
    );
  });

  it("should be able to authenticate an user", async () => {
    const role = await rolesRepositoryInMemory.create({
      description: "Role description",
      privilege: "costumer",
    });

    const user: ICreateUserDTO = {
      name: "Usuario",
      email: "user@example.com",
      password: "password",
      roles: [role],
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "password",
      })
    ).rejects.toEqual(new AppError("incorrect email or password"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const role = await rolesRepositoryInMemory.create({
      description: "Role description",
      privilege: "costumer",
    });

    const user: ICreateUserDTO = {
      email: "user@example.com",
      password: "password12345",
      name: "User test error",
      roles: [role],
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect",
      })
    ).rejects.toEqual(new AppError("incorrect email or password"));
  });
});
