import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrdersTable1658877991245 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "status",
            type: "varchar",
          },
          {
            name: "expires_in",
            type: "timestamp",
          },
          {
            name: "user_id",
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
            name: "FKUserOrder",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKTicketOrder",
            referencedTableName: "tickets",
            referencedColumnNames: ["id"],
            columnNames: ["ticket_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders");
  }
}
