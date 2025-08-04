/**
 * Builds complete URL with optional additional path and query parameters
 * @param baseUrl - base URL or endpoint
 * @param additionalPath - Optional additional path to append
 * @param queryParams - optional query parameters
 * @returns complete URL string with query parameter
 *
 * @example
 * buildUrl('/api/v2/users') --> '/api/v2/users'
 * buildUrl('/api/v2/users', 'profile') --> '/api/v2/users/profile'
 * buildUrl('/api/v2/users', undefined, { id: '123' }) --> '/api/v2/users?id=123'
 * buildUrl('/api/v2/users', 'profile', { includePhoto: 'true' }) --> '/api/v2/users/profile?includePhoto=true'
 */
export function buildUrl(baseUrl: string, additionalPath?: string, queryParams?: Record<string, string>): string {
  let url = baseUrl;

  if (additionalPath) {
    url += `/${additionalPath}`;
  }

  if (queryParams && Object.keys(queryParams).length > 0) {
    const params = new URLSearchParams(queryParams);
    url += `?${params.toString()}`;
  }

  return url;
}
