import { User } from "@modules/account/infra/typeorm/entities/User";
import { Ticket } from "@modules/tickets/infra/typeorm/entities/Ticket";

export interface ICreateOrderDTO {
  status?: string;
  expires_in?: Date;
  user?: User;
  tickets?: Ticket[];
  total_price?: number;
}
