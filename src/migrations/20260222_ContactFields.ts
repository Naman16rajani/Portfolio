import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "abouts"
      ADD COLUMN "name" varchar,
      ADD COLUMN "email" varchar,
      ADD COLUMN "phone" varchar;
  `)
  // optionally backfill existing rows with placeholder or blank
  await db.execute(sql`
    UPDATE "abouts" SET "name" = '', "email" = '', "phone" = '' WHERE "name" IS NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "abouts"
      DROP COLUMN IF EXISTS "name",
      DROP COLUMN IF EXISTS "email",
      DROP COLUMN IF EXISTS "phone";
  `)
}
