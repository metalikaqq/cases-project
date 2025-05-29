/**
 * Utility functions for processing HTML content from backend
 */

/**
 * Processes HTML content to ensure proper rendering
 * @param htmlContent - Raw HTML content from backend
 * @returns Processed HTML content
 */
export function processHtmlContent(htmlContent: string): string {
  if (!htmlContent) return '';

  // Remove excessive whitespace while preserving intentional formatting
  let processed = htmlContent
    .trim()
    // Normalize line breaks and spacing around tags
    .replace(/>\s+</g, '><')
    // Ensure proper spacing after closing tags that should have space
    .replace(/<\/(p|div|h[1-6]|li)>/g, '</$1>\n')
    // Clean up any double spaces
    .replace(/\s+/g, ' ')
    // Restore line breaks for block elements
    .replace(/(<\/?(p|div|h[1-6]|ul|ol|li)[^>]*>)/g, '\n$1\n')
    // Clean up excessive line breaks
    .replace(/\n\s*\n/g, '\n')
    .trim();

  return processed;
}

/**
 * Sanitizes HTML content for safe rendering
 * @param htmlContent - HTML content to sanitize
 * @returns Sanitized HTML content
 */
export function sanitizeHtmlContent(htmlContent: string): string {
  if (!htmlContent) return '';

  // Basic sanitization - remove potentially dangerous elements and attributes
  // Note: For production, consider using a proper HTML sanitizer like DOMPurify
  const processed = htmlContent
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');

  return processed;
}

/**
 * Validates if HTML content is safe for rendering
 * @param htmlContent - HTML content to validate
 * @returns Boolean indicating if content is safe
 */
export function isHtmlContentSafe(htmlContent: string): boolean {
  if (!htmlContent) return true;

  const dangerousPatterns = [
    /<script/i,
    /<iframe/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<object/i,
    /<embed/i,
  ];

  return !dangerousPatterns.some((pattern) => pattern.test(htmlContent));
}

/**
 * Combines processing and sanitization for HTML content
 * @param htmlContent - Raw HTML content from backend
 * @returns Processed and sanitized HTML content
 */
export function prepareHtmlContent(htmlContent: string): string {
  if (!htmlContent) return '';

  const sanitized = sanitizeHtmlContent(htmlContent);
  const processed = processHtmlContent(sanitized);

  return processed;
}
