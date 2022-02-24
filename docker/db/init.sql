CREATE TABLE "accounts"(
  "userid" character(40) NOT NULL,
  "username" character(40) NOT NULL,
  "firstname" character(40) NOT NULL,
  "lastname" character(40) NOT NULL,
  "password" character(80) NOT NULL,
  PRIMARY KEY ("userid")
);

ALTER TABLE "accounts"
ADD CONSTRAINT "accounts_username" UNIQUE ("username");

CREATE TABLE "puzzles" (
  "puzzleId" character(40) NOT NULL,
  "userid" character(40) NOT NULL,
  "puzzleDifficulty" integer NOT NULL,
  "originalNumbers" json NOT NULL,
  "userEnteredNumbers" json NOT NULL,
  "completed" boolean NOT NULL,
  PRIMARY KEY ("puzzleId")
);

CREATE INDEX "puzzles_userid" ON "puzzles" ("userid");
CREATE INDEX "puzzles_completed" ON "puzzles" ("userid", "completed");