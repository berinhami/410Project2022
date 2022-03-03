-- Acounts

CREATE TABLE "accounts"(
  "userid" varchar(40) NOT NULL,
  "username" varchar(40) NOT NULL,
  "firstname" varchar(40) NOT NULL,
  "lastname" varchar(40) NOT NULL,
  "password" varchar(80) NOT NULL,
  PRIMARY KEY ("userid")
);

ALTER TABLE "accounts"
ADD CONSTRAINT "accounts_username" UNIQUE ("username");

-- Sessions

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX "IDX_session_expire" ON "session" ("expire");

--Puzzles

CREATE TABLE "puzzles" (
  "puzzleId" varchar(40) NOT NULL,
  "userid" varchar(40) NOT NULL,
  "puzzleDifficulty" integer NOT NULL,
  "originalNumbers" json NOT NULL,
  "userEnteredNumbers" json NOT NULL,
  "completed" boolean NOT NULL,
  PRIMARY KEY ("puzzleId")
);

CREATE INDEX "puzzles_userid" ON "puzzles" ("userid");
CREATE INDEX "puzzles_completed" ON "puzzles" ("userid", "completed");