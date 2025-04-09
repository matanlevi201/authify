import { z, ZodError } from "zod";

const envSchemaProd = z.object({
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string().url(),
  CLIENT_URL: z.string().url(),
  ACCESS_JWT_KEY: z.string().min(32),
  REFRESH_JWT_KEY: z.string().min(32),
  RESET_JWT_KEY: z.string().min(32),
  TEMP_2FA_JWT_KEY: z.string().min(32),
  EMAIL_SERVICE: z.string(),
  COURIER_AUTH_TOKEN: z.string(),
  RESET_PASSWORD_TEMPLATE_ID: z.string(),
  COURIER_DOMAIN: z.string().url(),
  GCP_CLIENT_ID: z.string().min(32),
  GCP_CLIENT_SECRET: z.string().min(32),
  GPC_CALLBACK_URL: z.string().url(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  RENDER_URL: z.string(),
});

const envSchemaTest = z.object({
  CLIENT_URL: z.string().url(),
  ACCESS_JWT_KEY: z.string().min(32),
  REFRESH_JWT_KEY: z.string().min(32),
  RESET_JWT_KEY: z.string().min(32),
  TEMP_2FA_JWT_KEY: z.string().min(32),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  RENDER_DEPLOY_HOOK: z.string(),
});

export const env = (() => {
  try {
    if (process.env.NODE_ENV === "test") {
      return envSchemaTest.parse(process.env);
    }
    console.log("im not in test mode");
    return envSchemaProd.parse(process.env);
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      console.error("Invalid environment variables:", error.format());
    }
    process.exit(1);
  }
})();
