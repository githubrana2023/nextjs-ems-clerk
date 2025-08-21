ALTER TABLE "family_given_loan" ALTER COLUMN "family_loan_recipient" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "family_given_loan" ALTER COLUMN "source_bank_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "family_taken_loan" ALTER COLUMN "loan_provider_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "family_taken_loan" ALTER COLUMN "receive_bank_id" SET NOT NULL;