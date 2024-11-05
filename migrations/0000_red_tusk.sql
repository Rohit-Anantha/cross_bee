CREATE TABLE IF NOT EXISTS "cross_bee_guesses" (
	"guess_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"content" text NOT NULL
);
