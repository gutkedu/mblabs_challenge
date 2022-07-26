import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTicketsTable1658841517058 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tickets",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "event",
            type: "varchar",
          },
          {
            name: "price",
            type: "numeric",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "event_date",
            type: "timestamp",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tickets");
  }
}
