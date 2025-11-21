import z from 'zod';
import 'dotenv/config';
const envSchema = z.object({
  UI_URL: z.string().nonoptional().default('http://localhost:3000'),
  PORT: z.coerce.number().optional().default(3050),
  POSTGRES_DB: z.string().nonoptional(),
  POSTGRES_USER: z.string().nonoptional().default('postgres'),
  POSTGRES_PASSWORD: z.string().nonoptional(),
  DATABASE_URL: z.string().nonoptional(),
  RESEND_API_KEY: z.string().nonoptional(),
  RESEND_DEFAULT_EMAIL_ORIGIN: z
    .string()
    .nonoptional()
    .default('Synapse <onboarding@resend.dev>'),
  GOOGLE_CLIENT_SECRET: z.string().nonoptional(),
  GOOGLE_CLIENT_ID: z.string().nonoptional(),
  MICROSOFT_CLIENT_SECRET: z.string().nonoptional(),
  MICROSOFT_CLIENT_ID: z.string().nonoptional(),
  ARCJET_ENV: z.string().nonoptional(),
  ARCJET_KEY: z.string().nonoptional(),
  BETTER_AUTH_SECRET: z.string().nonoptional(),
  BETTER_AUTH_URL: z.string().nonoptional().default('http://localhost:3050'),
  REDIS_PASSWORD: z.string().nonoptional(),
  REDIS_USER: z.string().nonoptional(),
  REDIS_URL: z.string().nonoptional(),
});

// parsing process.env
export const env = envSchema.parse(process.env);

// Infering the type
export type Environment = z.infer<typeof envSchema>;


// Validate env (used on ConfigModule)
export function validadeEnv(config: Record<string, unknown>) {
  const safeEnv = envSchema.parse(config);
  return safeEnv;
}
