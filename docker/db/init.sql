--  Define accounts table
/*
CREATE TABLE "accounts" (
  "userId" character(32) NOT NULL,
  "firstName" character varying(40) NOT NULL,
  "lastName" character varying(40) NOT NULL,
  "username" character varying(40) NOT NULL,
  "password" character varying(80) NOT NULL,
  PRIMARY KEY ("userId")
);
CREATE INDEX "accounts_username" ON "accounts" ("username");

-- Replicate database into a test database
CREATE DATABASE test WITH TEMPLATE <YOUR_DATABASE_NAME>;
*/