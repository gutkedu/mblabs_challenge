import { AuthenticateUserController } from "@modules/account/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/account/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post("/login", authenticateUserController.handle);

authRoutes.post("/refresh-token", refreshTokenController.handle);

export { authRoutes };
