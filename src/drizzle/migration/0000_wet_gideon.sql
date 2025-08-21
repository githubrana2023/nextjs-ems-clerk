CREATE TABLE "assign_member_receive_bank" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_trx_name_id" uuid NOT NULL,
	"member_receive_bank_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "assign_member_receive_bank_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "assign_member_source_bank" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_trx_name_id" uuid NOT NULL,
	"member_source_bank_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "assign_member_source_bank_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "assign_family_receive_bank" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_trx_name_id" uuid NOT NULL,
	"family_receive_bank_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "assign_family_receive_bank_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "assign_family_source_bank" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_trx_name_id" uuid NOT NULL,
	"family_source_bank_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "assign_family_source_bank_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "family_bank_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"name" text NOT NULL,
	"balance" numeric(7, 2) NOT NULL,
	"local_bank_number" text NOT NULL,
	"description" text,
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_bank_accounts_id_unique" UNIQUE("id"),
	CONSTRAINT "family_bank_accounts_name_unique" UNIQUE("name"),
	CONSTRAINT "family_bank_accounts_local_bank_number_unique" UNIQUE("local_bank_number")
);
--> statement-breakpoint
CREATE TABLE "family_loan_provider_bill" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"family_loan_provider_id" uuid NOT NULL,
	"family_taken_loan_id" uuid NOT NULL,
	"source_bank_id" uuid NOT NULL,
	"amount" numeric(7, 2) NOT NULL,
	"description" text,
	"payment_date" timestamp with time zone NOT NULL,
	"total_remaining" numeric(7, 2) NOT NULL,
	"isCancel" boolean DEFAULT false,
	"cancel_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_loan_provider_bill_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "family_loan_provider" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"total_debt" numeric(7, 2),
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_loan_provider_id_unique" UNIQUE("id"),
	CONSTRAINT "family_loan_provider_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "family_given_loan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"family_loan_recipient" uuid,
	"source_bank_id" uuid,
	"amount" numeric(7, 2) NOT NULL,
	"description" text,
	"loan_type" text NOT NULL,
	"loan_date" timestamp with time zone NOT NULL,
	"total_remaining" numeric(7, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_given_loan_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "family_taken_loan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"loan_provider_id" uuid,
	"receive_bank_id" uuid,
	"amount" numeric(7, 2) NOT NULL,
	"description" text,
	"loan_type" text NOT NULL,
	"loan_taken_date" timestamp with time zone NOT NULL,
	"total_remaining" numeric(7, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_taken_loan_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "member_bank_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"name" text NOT NULL,
	"balance" numeric(7, 2) NOT NULL,
	"local_bank_number" text NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "member_bank_accounts_id_unique" UNIQUE("id"),
	CONSTRAINT "member_bank_accounts_name_unique" UNIQUE("name"),
	CONSTRAINT "member_bank_accounts_local_bank_number_unique" UNIQUE("local_bank_number")
);
--> statement-breakpoint
CREATE TABLE "member_loan_provider_bill" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"member_loan_provider_id" uuid NOT NULL,
	"member_loan_id" uuid NOT NULL,
	"member_source_bank_id" uuid NOT NULL,
	"amount" numeric(7, 2) NOT NULL,
	"description" text,
	"payment_date" timestamp with time zone NOT NULL,
	"total_debt" numeric(7, 2) NOT NULL,
	"isCancel" boolean DEFAULT false,
	"cancel_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "member_loan_provider_bill_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "member_loan_provider" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"total_debt" numeric(7, 2),
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "member_loan_provider_id_unique" UNIQUE("id"),
	CONSTRAINT "member_loan_provider_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "member_given_loan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"member_loan_recipient_id" uuid NOT NULL,
	"member_source_bank_id" uuid NOT NULL,
	"loan_type" text NOT NULL,
	"amount" numeric(7, 2) NOT NULL,
	"description" text,
	"loan_given_date" timestamp with time zone NOT NULL,
	"total_remaining" numeric(7, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "member_given_loan_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "member_take_loan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"member_loan_provider_id" uuid NOT NULL,
	"member_receive_bank_id" uuid NOT NULL,
	"loan_type" text NOT NULL,
	"amount" numeric(7, 2) NOT NULL,
	"description" text,
	"loan_taken_date" timestamp with time zone NOT NULL,
	"total_remaining" numeric(7, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "member_take_loan_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "member_trx_name" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"name" text NOT NULL,
	"variant" text NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "member_trx_name_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "member_transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trx_name" text NOT NULL,
	"amount" numeric(7, 2) NOT NULL,
	"description" text,
	"member_trx_name_id" uuid NOT NULL,
	"member_source_bank_id" uuid,
	"member_receive_bank_id" uuid,
	"isCancel" boolean DEFAULT false,
	"cancel_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "member_transaction_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"password" text NOT NULL,
	"relation" text NOT NULL,
	"role" text DEFAULT 'MEMBER' NOT NULL,
	"email_verified_at" timestamp with time zone,
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "members_id_unique" UNIQUE("id"),
	CONSTRAINT "members_email_unique" UNIQUE("email"),
	CONSTRAINT "members_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "family_shopkeepers-bill" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"family_shopkeeper_id" uuid NOT NULL,
	"amount" numeric(7, 2) NOT NULL,
	"description" text,
	"payment_date" timestamp with time zone NOT NULL,
	"isCancel" boolean DEFAULT false,
	"cancel_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_shopkeepers-bill_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "family_shopkeepers-purchase" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"family_shopkeeper_id" uuid NOT NULL,
	"total" numeric(7, 2) NOT NULL,
	"description" text NOT NULL,
	"purchase_date" timestamp with time zone NOT NULL,
	"paid" numeric(7, 2) NOT NULL,
	"due" numeric(7, 2) NOT NULL,
	"isCancel" boolean DEFAULT false,
	"cancel_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_shopkeepers-purchase_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "family_shopkeeper" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"total_debt" numeric(7, 2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_shopkeeper_id_unique" UNIQUE("id"),
	CONSTRAINT "family_shopkeeper_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "family_trx_name" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"name" text NOT NULL,
	"variant" text NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_trx_name_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "family_transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trx_name" text NOT NULL,
	"amount" numeric(7, 2) NOT NULL,
	"description" text,
	"family_trx_name_id" uuid NOT NULL,
	"family_source_bank_id" uuid,
	"family_receive_bank_id" uuid,
	"isCancel" boolean DEFAULT false,
	"cancel_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_transaction_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "family_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'FAMILY' NOT NULL,
	"email_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_table_id_unique" UNIQUE("id"),
	CONSTRAINT "family_table_phone_unique" UNIQUE("phone"),
	CONSTRAINT "family_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "family_loan_recipient_payment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"family_loan_recipient_id" uuid NOT NULL,
	"family_loan_give_id" uuid NOT NULL,
	"family_receive_bank_id" uuid NOT NULL,
	"amount" numeric(7, 2) NOT NULL,
	"description" text,
	"payment_date" timestamp with time zone NOT NULL,
	"total_remaining" numeric(7, 2) NOT NULL,
	"isCancel" boolean DEFAULT false,
	"cancel_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_loan_recipient_payment_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "family_loan_recipient" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"total_debt" numeric(7, 2),
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_loan_recipient_id_unique" UNIQUE("id"),
	CONSTRAINT "family_loan_recipient_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "member_loan_recipient_payment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"member_loan_recipient_id" uuid NOT NULL,
	"member_loan_give_id" uuid NOT NULL,
	"amount" numeric(7, 2) NOT NULL,
	"description" text,
	"payment_date" timestamp with time zone NOT NULL,
	"isCancel" boolean DEFAULT false,
	"cancel_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "member_loan_recipient_payment_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "member_loan_recipient" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"total_credit" numeric(7, 2),
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "member_loan_recipient_id_unique" UNIQUE("id"),
	CONSTRAINT "member_loan_recipient_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "assign_member_receive_bank" ADD CONSTRAINT "assign_member_receive_bank_member_trx_name_id_member_trx_name_id_fk" FOREIGN KEY ("member_trx_name_id") REFERENCES "public"."member_trx_name"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_member_receive_bank" ADD CONSTRAINT "assign_member_receive_bank_member_receive_bank_id_member_bank_accounts_id_fk" FOREIGN KEY ("member_receive_bank_id") REFERENCES "public"."member_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_member_source_bank" ADD CONSTRAINT "assign_member_source_bank_member_trx_name_id_member_trx_name_id_fk" FOREIGN KEY ("member_trx_name_id") REFERENCES "public"."member_trx_name"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_member_source_bank" ADD CONSTRAINT "assign_member_source_bank_member_source_bank_id_member_bank_accounts_id_fk" FOREIGN KEY ("member_source_bank_id") REFERENCES "public"."member_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_family_receive_bank" ADD CONSTRAINT "assign_family_receive_bank_family_trx_name_id_family_trx_name_id_fk" FOREIGN KEY ("family_trx_name_id") REFERENCES "public"."family_trx_name"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_family_receive_bank" ADD CONSTRAINT "assign_family_receive_bank_family_receive_bank_id_family_bank_accounts_id_fk" FOREIGN KEY ("family_receive_bank_id") REFERENCES "public"."family_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_family_source_bank" ADD CONSTRAINT "assign_family_source_bank_family_trx_name_id_family_trx_name_id_fk" FOREIGN KEY ("family_trx_name_id") REFERENCES "public"."family_trx_name"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_family_source_bank" ADD CONSTRAINT "assign_family_source_bank_family_source_bank_id_family_bank_accounts_id_fk" FOREIGN KEY ("family_source_bank_id") REFERENCES "public"."family_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_bank_accounts" ADD CONSTRAINT "family_bank_accounts_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_loan_provider_bill" ADD CONSTRAINT "family_loan_provider_bill_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_loan_provider_bill" ADD CONSTRAINT "family_loan_provider_bill_family_loan_provider_id_family_loan_provider_id_fk" FOREIGN KEY ("family_loan_provider_id") REFERENCES "public"."family_loan_provider"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_loan_provider_bill" ADD CONSTRAINT "family_loan_provider_bill_family_taken_loan_id_family_taken_loan_id_fk" FOREIGN KEY ("family_taken_loan_id") REFERENCES "public"."family_taken_loan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_loan_provider_bill" ADD CONSTRAINT "family_loan_provider_bill_source_bank_id_family_bank_accounts_id_fk" FOREIGN KEY ("source_bank_id") REFERENCES "public"."family_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_loan_provider" ADD CONSTRAINT "family_loan_provider_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_given_loan" ADD CONSTRAINT "family_given_loan_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_given_loan" ADD CONSTRAINT "family_given_loan_family_loan_recipient_family_loan_recipient_id_fk" FOREIGN KEY ("family_loan_recipient") REFERENCES "public"."family_loan_recipient"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_given_loan" ADD CONSTRAINT "family_given_loan_source_bank_id_family_bank_accounts_id_fk" FOREIGN KEY ("source_bank_id") REFERENCES "public"."family_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_taken_loan" ADD CONSTRAINT "family_taken_loan_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_taken_loan" ADD CONSTRAINT "family_taken_loan_loan_provider_id_family_loan_provider_id_fk" FOREIGN KEY ("loan_provider_id") REFERENCES "public"."family_loan_provider"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_taken_loan" ADD CONSTRAINT "family_taken_loan_receive_bank_id_family_bank_accounts_id_fk" FOREIGN KEY ("receive_bank_id") REFERENCES "public"."family_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_bank_accounts" ADD CONSTRAINT "member_bank_accounts_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_bank_accounts" ADD CONSTRAINT "member_bank_accounts_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_loan_provider_bill" ADD CONSTRAINT "member_loan_provider_bill_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_loan_provider_bill" ADD CONSTRAINT "member_loan_provider_bill_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_loan_provider_bill" ADD CONSTRAINT "member_loan_provider_bill_member_loan_provider_id_member_loan_provider_id_fk" FOREIGN KEY ("member_loan_provider_id") REFERENCES "public"."member_loan_provider"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_loan_provider_bill" ADD CONSTRAINT "member_loan_provider_bill_member_loan_id_member_take_loan_id_fk" FOREIGN KEY ("member_loan_id") REFERENCES "public"."member_take_loan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_loan_provider_bill" ADD CONSTRAINT "member_loan_provider_bill_member_source_bank_id_member_bank_accounts_id_fk" FOREIGN KEY ("member_source_bank_id") REFERENCES "public"."member_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_loan_provider" ADD CONSTRAINT "member_loan_provider_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_loan_provider" ADD CONSTRAINT "member_loan_provider_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_given_loan" ADD CONSTRAINT "member_given_loan_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_given_loan" ADD CONSTRAINT "member_given_loan_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_given_loan" ADD CONSTRAINT "member_given_loan_member_loan_recipient_id_member_loan_recipient_id_fk" FOREIGN KEY ("member_loan_recipient_id") REFERENCES "public"."member_loan_recipient"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_given_loan" ADD CONSTRAINT "member_given_loan_member_source_bank_id_member_bank_accounts_id_fk" FOREIGN KEY ("member_source_bank_id") REFERENCES "public"."member_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_take_loan" ADD CONSTRAINT "member_take_loan_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_take_loan" ADD CONSTRAINT "member_take_loan_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_take_loan" ADD CONSTRAINT "member_take_loan_member_loan_provider_id_member_loan_provider_id_fk" FOREIGN KEY ("member_loan_provider_id") REFERENCES "public"."member_loan_provider"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_take_loan" ADD CONSTRAINT "member_take_loan_member_receive_bank_id_member_bank_accounts_id_fk" FOREIGN KEY ("member_receive_bank_id") REFERENCES "public"."member_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_trx_name" ADD CONSTRAINT "member_trx_name_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_trx_name" ADD CONSTRAINT "member_trx_name_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_transaction" ADD CONSTRAINT "member_transaction_member_trx_name_id_member_trx_name_id_fk" FOREIGN KEY ("member_trx_name_id") REFERENCES "public"."member_trx_name"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_transaction" ADD CONSTRAINT "member_transaction_member_source_bank_id_member_bank_accounts_id_fk" FOREIGN KEY ("member_source_bank_id") REFERENCES "public"."member_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_transaction" ADD CONSTRAINT "member_transaction_member_receive_bank_id_member_bank_accounts_id_fk" FOREIGN KEY ("member_receive_bank_id") REFERENCES "public"."member_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_shopkeepers-bill" ADD CONSTRAINT "family_shopkeepers-bill_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_shopkeepers-bill" ADD CONSTRAINT "family_shopkeepers-bill_family_shopkeeper_id_family_shopkeeper_id_fk" FOREIGN KEY ("family_shopkeeper_id") REFERENCES "public"."family_shopkeeper"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_shopkeepers-purchase" ADD CONSTRAINT "family_shopkeepers-purchase_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_shopkeepers-purchase" ADD CONSTRAINT "family_shopkeepers-purchase_family_shopkeeper_id_family_shopkeeper_id_fk" FOREIGN KEY ("family_shopkeeper_id") REFERENCES "public"."family_shopkeeper"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_shopkeeper" ADD CONSTRAINT "family_shopkeeper_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_trx_name" ADD CONSTRAINT "family_trx_name_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_transaction" ADD CONSTRAINT "family_transaction_family_trx_name_id_family_trx_name_id_fk" FOREIGN KEY ("family_trx_name_id") REFERENCES "public"."family_trx_name"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_transaction" ADD CONSTRAINT "family_transaction_family_source_bank_id_family_bank_accounts_id_fk" FOREIGN KEY ("family_source_bank_id") REFERENCES "public"."family_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_transaction" ADD CONSTRAINT "family_transaction_family_receive_bank_id_family_bank_accounts_id_fk" FOREIGN KEY ("family_receive_bank_id") REFERENCES "public"."family_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_loan_recipient_payment" ADD CONSTRAINT "family_loan_recipient_payment_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_loan_recipient_payment" ADD CONSTRAINT "family_loan_recipient_payment_family_loan_recipient_id_family_loan_recipient_id_fk" FOREIGN KEY ("family_loan_recipient_id") REFERENCES "public"."family_loan_recipient"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_loan_recipient_payment" ADD CONSTRAINT "family_loan_recipient_payment_family_loan_give_id_family_given_loan_id_fk" FOREIGN KEY ("family_loan_give_id") REFERENCES "public"."family_given_loan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_loan_recipient_payment" ADD CONSTRAINT "family_loan_recipient_payment_family_receive_bank_id_family_bank_accounts_id_fk" FOREIGN KEY ("family_receive_bank_id") REFERENCES "public"."family_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_loan_recipient" ADD CONSTRAINT "family_loan_recipient_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_loan_recipient_payment" ADD CONSTRAINT "member_loan_recipient_payment_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_loan_recipient_payment" ADD CONSTRAINT "member_loan_recipient_payment_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_loan_recipient_payment" ADD CONSTRAINT "member_loan_recipient_payment_member_loan_recipient_id_member_loan_recipient_id_fk" FOREIGN KEY ("member_loan_recipient_id") REFERENCES "public"."member_loan_recipient"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_loan_recipient_payment" ADD CONSTRAINT "member_loan_recipient_payment_member_loan_give_id_member_given_loan_id_fk" FOREIGN KEY ("member_loan_give_id") REFERENCES "public"."member_given_loan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_loan_recipient" ADD CONSTRAINT "member_loan_recipient_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_loan_recipient" ADD CONSTRAINT "member_loan_recipient_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;