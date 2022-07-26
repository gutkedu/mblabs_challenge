import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserRolesTable1658703534587 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_roles",
        columns: [
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "role_id",
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
            name: "FKRoleUser",
            referencedTableName: "roles",
            referencedColumnNames: ["id"],
            columnNames: ["role_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKUserRole",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
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
