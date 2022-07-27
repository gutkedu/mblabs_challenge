import { Router } from "express";
import { CreateOrderController } from "@modules/orders/useCases/CreateOrderController";
import { ensureAuth } from "../middlewares/ensureAuth";

const orderRoutes = Router();

const createOrderController = new CreateOrderController();

orderRoutes.post("/", ensureAuth, createOrderController.handle);

export { orderRoutes };
