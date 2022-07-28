import { CreatePaymentIntentController } from "@modules/payment/useCases/createPaymentIntent/createPaymentIntentController";
import { CreateUserPaymentMethodController } from "@modules/payment/useCases/createUserPaymentMethod/createUserPaymentMethodController";
import { Router } from "express";
import { ensureAuth } from "../middlewares/ensureAuth";

const paymentRoutes = Router();

const createPaymentIntentController = new CreatePaymentIntentController();
const createPaymentMethodController = new CreateUserPaymentMethodController();

paymentRoutes.post("/method", ensureAuth, createPaymentMethodController.handle);

paymentRoutes.post("/intent", createPaymentIntentController.handle);

export { paymentRoutes };
