import type { ValidationIssue } from './processor.ts';

export const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

export const isHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export const validateUrl = (issues: ValidationIssue[], property: string, value: unknown): void => {
  if (value !== undefined && value !== null && (!isNonEmptyString(value) || !isHttpUrl(value))) {
    issues.push(`"${property}" must be an absolute HTTP(S) URL.`);
  }
};

export const formatValidationIssues = (issues: ValidationIssue[]): string => [
  '[vite-plugin-open-graph] Invalid Open Graph configuration:',
  ...issues.map(issue => `- ${issue}`),
].join('\n');
