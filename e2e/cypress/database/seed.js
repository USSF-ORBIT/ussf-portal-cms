// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('pg')

const dropAndCreateUsersTable = async (client) => {
  // Drop
  await client.query(`DROP TABLE IF EXISTS "public"."User";`)

  // Create schema
  await client.query(`CREATE TABLE "public"."User" (
    "id" text NOT NULL,
    "name" text NOT NULL DEFAULT ''::text,
    "isAdmin" bool NOT NULL DEFAULT false,
    "isEnabled" bool NOT NULL DEFAULT false,
    "userId" text NOT NULL DEFAULT ''::text,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "syncedAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);`)
}

module.exports.seedRevokeUsers = async () => {
  const connectionString =
    'postgres://keystone:keystonecms@0.0.0.0:5432/cypress'

  const client = new Client({ connectionString })

  try {
    await client.connect()
    await dropAndCreateUsersTable(client)

    // These users are intentionally out-of-sync with their access in the test users SAML file for testing purposes
    await client.query(`INSERT INTO "public"."User" ("id", "name", "isAdmin", "isEnabled", "userId") VALUES
('cl0jylky70105fs97hvb6sc7x', 'RONALD BOYD', 'f', 't', 'RONALD.BOYD.312969168@testusers.cce.af.mil'),
('cl0jyfow10002fs97yimqq04c', 'JOHN HENKE', 't', 't', 'JOHN.HENKE.562270783@testusers.cce.af.mil'),
('cl0jylky79105fs97hvb6sc7x', 'FLOYD KING', 't', 't', 'FLOYD.KING.376144527@testusers.cce.af.mil');`)

    console.log(`Cypress database seeded!`)

    await client.end()
  } catch (err) {
    console.log(err.stack)
    return err
  }
}

module.exports.seedGrantUsers = async () => {
  const connectionString =
    'postgres://keystone:keystonecms@0.0.0.0:5432/cypress'

  const client = new Client({ connectionString })

  try {
    await client.connect()
    await dropAndCreateUsersTable(client)

    // These users are intentionally out-of-sync with their access in the test users SAML file for testing purposes
    await client.query(`INSERT INTO "public"."User" ("id", "name", "isAdmin", "isEnabled", "userId") VALUES
('cl0jyfow10002fs97yimqq04c', 'JOHN HENKE', 'f', 'f', 'JOHN.HENKE.562270783@testusers.cce.af.mil'),
('cl0jylky79105fs97hvb6sc7x', 'FLOYD KING', 'f', 'f', 'FLOYD.KING.376144527@testusers.cce.af.mil');`)

    console.log(`Cypress database seeded!`)

    await client.end()
  } catch (err) {
    console.log(err.stack)
    return err
  }
}
