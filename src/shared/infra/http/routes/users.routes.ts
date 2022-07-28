import { CreateUserController } from "@modules/account/useCases/createUser/CreateUserController";
import { RemoveUserController } from "@modules/account/useCases/removeUser/RemoveUserController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuth } from "../middlewares/ensureAuth";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const removeUserController = new RemoveUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.delete(
  "/:id",
  ensureAuth,
  ensureAdmin,
  removeUserController.handle
);

export { usersRoutes };
