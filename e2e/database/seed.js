// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('pg')

const E2E_TEST_DATABASE = 'test'
const E2E_TEST_CONNECTION = `postgres://keystone:keystonecms@0.0.0.0:5432/${E2E_TEST_DATABASE}`

// DB util functions
const dropAndCreateSchema = async (client) => {
  // Drop
  await client.query(`DROP TABLE IF EXISTS "public"."Event" CASCADE;`)

  // Create schema
  await client.query(`CREATE TABLE "public"."Event" (
    "id" text NOT NULL,
    "operation" text NOT NULL DEFAULT ''::text,
    "itemListKey" text NOT NULL DEFAULT ''::text,
    "itemId" text NOT NULL DEFAULT ''::text,
    "inputData" jsonb,
    "resolvedData" jsonb,
    "changedData" jsonb,
    "originalItem" jsonb,
    "item" jsonb,
    "actor" text,
    "updatedAt" timestamp(3),
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);`)

  // Drop
  await client.query(`DROP TABLE IF EXISTS "public"."User" CASCADE;`)

  // Create schema
  await client.query(`CREATE TABLE "public"."User" (
    "id" text NOT NULL,
    "userId" text NOT NULL DEFAULT ''::text,
    "name" text NOT NULL DEFAULT ''::text,
    "isAdmin" bool NOT NULL DEFAULT false,
    "isEnabled" bool NOT NULL DEFAULT false,
    "syncedAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" text,
    "createdBy" text,
    "updatedAt" timestamp(3),
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);`)

  await client.query(`ALTER TABLE "public"."Event" ADD FOREIGN KEY ("actor") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."User" ADD FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."User" ADD FOREIGN KEY ("updatedBy") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
`)

  await client.query(`ALTER TABLE "User" ADD COLUMN     "role" "UserRoleType" NOT NULL DEFAULT E'User';
`)
}

// DB exports
module.exports.resetDb = async () => {
  const client = new Client({ connectionString: E2E_TEST_CONNECTION })

  try {
    await client.connect()
    await dropAndCreateSchema(client)
    console.log(`E2E database reset!`)
    await client.end()
  } catch (err) {
    console.log(err.stack)
    return err
  }
}

module.exports.seedRevokeUsers = async () => {
  const client = new Client({ connectionString: E2E_TEST_CONNECTION })

  try {
    await client.connect()
    await dropAndCreateSchema(client)

    // These users are intentionally out-of-sync with their access in the test users SAML file for testing purposes
    await client.query(`INSERT INTO "public"."User" ("id", "name", "isAdmin", "isEnabled", "role", "userId") VALUES
('cl0jylky70105fs97hvb6sc7x', 'RONALD BOYD', 'f', 't', 'User', 'RONALD.BOYD.312969168@testusers.cce.af.mil'),
('cl0jyfow10002fs97yimqq04c', 'JOHN HENKE', 't', 't', 'User', 'JOHN.HENKE.562270783@testusers.cce.af.mil'),
('cl0jylky79105fs97hvb6sc7x', 'FLOYD KING', 't', 't', 'User', 'FLOYD.KING.376144527@testusers.cce.af.mil');`)

    console.log(`E2E database seeded!`)

    await client.end()
  } catch (err) {
    console.log(err.stack)
    return err
  }
}

module.exports.seedGrantUsers = async () => {
  const client = new Client({ connectionString: E2E_TEST_CONNECTION })

  try {
    await client.connect()
    await dropAndCreateSchema(client)

    // These users are intentionally out-of-sync with their access in the test users SAML file for testing purposes
    await client.query(`INSERT INTO "public"."User" ("id", "name", "isAdmin", "isEnabled", "role", "userId") VALUES
('cl0jyfow10002fs97yimqq04c', 'JOHN HENKE', 'f', 'f', 'User', 'JOHN.HENKE.562270783@testusers.cce.af.mil'),
('cl0jylky79105fs97hvb6sc7x', 'FLOYD KING', 'f', 'f', 'User', 'FLOYD.KING.376144527@testusers.cce.af.mil');`)

    console.log(`E2E database seeded!`)

    await client.end()
  } catch (err) {
    console.log(err.stack)
    return err
  }
}
