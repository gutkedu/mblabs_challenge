import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { passwordRoutes } from "./password.routes";
import { ticketsRoutes } from "./tickets.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/tickets", ticketsRoutes);
router.use("/users", usersRoutes);
router.use("/password", passwordRoutes);
router.use(authRoutes);

export { router };
