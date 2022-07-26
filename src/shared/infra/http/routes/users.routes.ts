import { CreateUserController } from "@modules/account/useCases/createUser/CreateUserController";
import { RemoveUserController } from "@modules/account/useCases/removeUser/RemoveUserController";
import { Router } from "express";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const removeUserController = new RemoveUserController();

usersRoutes.post("/", createUserController.handle);

// TODO: Add admin middleware
usersRoutes.delete("/:id", removeUserController.handle);

export { usersRoutes };
