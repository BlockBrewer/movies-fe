interface EnvConfig {
  api: {
    baseUrl: string;
    version: string;
    debug: boolean;
  };
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
}

export const env: EnvConfig = {
  api: {
    baseUrl: getEnvVar("NEXT_PUBLIC_API_BASE_URL", "http://localhost:3025"),
    version: getEnvVar("NEXT_PUBLIC_API_VERSION", "v1"),
    debug: getEnvVar("NEXT_PUBLIC_API_DEBUG", "false") === "true",
  },
};
