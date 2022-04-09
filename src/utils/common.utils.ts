export const requireEnv = (envName: string): string => {
  const env = process.env[envName];
  if (!env) {
    throw new Error(`Environment variable ${envName} not found`);
  }

  return env;
};
