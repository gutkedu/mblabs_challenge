import { Router } from "express";
import { CreateTicketController } from "@modules/tickets/useCases/createTicket/createTicketController";
import { DeleteTicketController } from "@modules/tickets/useCases/deleteTicket/deleteTicketController";
import { FindTicketController } from "@modules/tickets/useCases/findTicket/FindTicketController";
import { FindAllTicketsController } from "@modules/tickets/useCases/findAllTickets/findAllTicketsController";
import { ensureAuth } from "../middlewares/ensureAuth";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const ticketsRoutes = Router();

const createTicketController = new CreateTicketController();
const deleteTicketController = new DeleteTicketController();
const findTicketController = new FindTicketController();
const findAllTicketsController = new FindAllTicketsController();

ticketsRoutes.post("/", createTicketController.handle);

ticketsRoutes.delete(
  "/:id",
  ensureAuth,
  ensureAdmin,
  deleteTicketController.handle
);

ticketsRoutes.get("/:id", findTicketController.handle);

ticketsRoutes.get("/", findAllTicketsController.handle);

export { ticketsRoutes };
