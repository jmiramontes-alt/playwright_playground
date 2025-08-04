const SUPPORTED_ENVIRONMENTS = ['staging', 'preprod'] as const;
type SupportedEnvironment = (typeof SUPPORTED_ENVIRONMENTS)[number];

/**
 * Validates and returns the current environment
 * @param fallback - Optional fallback environment (default: 'staging')
 * @returns The validated environment
 * @throws Error if environment is not supported
 */
export function getValidatedEnvironment(fallback: SupportedEnvironment = 'staging'): SupportedEnvironment {
  const currentEnv = process.env.ENVIRONMENT || fallback;

  if (!SUPPORTED_ENVIRONMENTS.includes(currentEnv as SupportedEnvironment)) {
    const supportedList = SUPPORTED_ENVIRONMENTS.join(', ');
    throw new Error(
      `Invalid ENVIRONMENT: "${currentEnv}". ` +
        `Supported environments are: ${supportedList}. ` +
        `Please set ENVIRONMENT to one of these values or use the default fallback.`,
    );
  }

  return currentEnv as SupportedEnvironment;
}

export function isSupportedEnvironment(env: string): env is SupportedEnvironment {
  return SUPPORTED_ENVIRONMENTS.includes(env as SupportedEnvironment);
}

export function getSupportedEnvironments(): readonly string[] {
  return SUPPORTED_ENVIRONMENTS;
}
