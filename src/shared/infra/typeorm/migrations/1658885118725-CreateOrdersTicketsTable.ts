import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrdersTicketsTable1658885118725
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders_tickets",
        columns: [
          {
            name: "order_id",
            type: "uuid",
          },
          {
            name: "ticket_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKTicketOrder",
            referencedTableName: "tickets",
            referencedColumnNames: ["id"],
            columnNames: ["ticket_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKOrderTicket",
            referencedTableName: "orders",
            referencedColumnNames: ["id"],
            columnNames: ["order_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_roles");
  }
}
