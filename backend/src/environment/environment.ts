type EnvironmentType = "development" | "production";

export const ENVIRONMENT: EnvironmentType = (
  process.env.NODE_ENV as string
).trim() as EnvironmentType;

export const CONVICTIONAL_PRODUCTS: string = (
  process.env.CONVICTIONAL_PRODUCTS ?? ""
).trim();
