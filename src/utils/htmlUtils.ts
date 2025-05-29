/**
 * HTML Processing Utilities for Product Content
 *
 * This module provides utilities to process HTML content received from the backend,
 * specifically designed to handle product descriptions that may contain duplicate
 * product names in heading tags.
 *
 * PROBLEM SOLVED:
 * Backend sends HTML content like:
 * ```
 * {
 *   "htmlContent": {
 *     "uk": "<strong><h1>ProductName</h1></strong><br><ul><li>Item 1</li></ul>",
 *     "en": "<strong><h1>ProductName</h1></strong><br><ul><li>Item 1</li></ul>"
 *   }
 * }
 * ```
 *
 * The product name is already displayed elsewhere on the page, so we need to:
 * 1. Remove the duplicate <strong><h1>ProductName</h1></strong> from the HTML
 * 2. Preserve the remaining HTML structure and formatting
 * 3. Ensure safe rendering with dangerouslySetInnerHTML
 * 4. Handle edge cases gracefully
 *
 * USAGE:
 * ```typescript
 * import { prepareHtmlContent } from '@/utils/htmlUtils';
 *
 * const processedContent = prepareHtmlContent(htmlContent, productName);
 *
 * // Render with React
 * <div dangerouslySetInnerHTML={{ __html: processedContent }} />
 * ```
 *
 * FEATURES:
 * - Removes duplicate product names from HTML content
 * - Handles multiple H1 wrapping patterns (<strong><h1>, <h1>, etc.)
 * - Sanitizes content for security
 * - Normalizes HTML structure for consistent rendering
 * - Provides fallback strategies for edge cases
 * - Maintains proper list formatting and spacing
 */

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
 * Removes duplicate product name from HTML content
 * @param htmlContent - Raw HTML content from backend
 * @param productName - Product name to remove from HTML
 * @returns HTML content with duplicate product name removed
 */
export function removeDuplicateProductName(
  htmlContent: string,
  productName?: string
): string {
  if (!htmlContent) return '';

  let processed = htmlContent.trim();

  // Strategy 1: Remove exact match with strong/h1 wrapper
  if (productName) {
    // Escape special regex characters in product name
    const escapedProductName = productName.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    );

    // Remove <strong><h1>productName</h1></strong> pattern (case-insensitive)
    const exactStrongPattern = new RegExp(
      `<strong>\\s*<h1[^>]*>\\s*${escapedProductName}\\s*</h1>\\s*</strong>`,
      'gi'
    );
    processed = processed.replace(exactStrongPattern, '');

    // Also try without strong wrapper: <h1>productName</h1>
    const exactH1Pattern = new RegExp(
      `<h1[^>]*>\\s*${escapedProductName}\\s*</h1>`,
      'gi'
    );
    processed = processed.replace(exactH1Pattern, '');
  }

  // Strategy 2: Remove any <strong><h1>...</h1></strong> at the beginning
  // This catches cases where the content doesn't exactly match the product name
  processed = processed.replace(
    /^\s*<strong>\s*<h1[^>]*>.*?<\/h1>\s*<\/strong>/i,
    ''
  );

  // Strategy 3: Remove any standalone <h1>...</h1> at the beginning
  processed = processed.replace(/^\s*<h1[^>]*>.*?<\/h1>/i, '');

  // Strategy 4: Handle wrapped h1 in strong at beginning (alternative format)
  processed = processed.replace(
    /^\s*<strong[^>]*>\s*<h1[^>]*>.*?<\/h1>\s*<\/strong[^>]*>/i,
    ''
  );

  // Clean up any leading <br> tags that might be left
  processed = processed.replace(/^\s*(<br\s*\/?>)+/i, '');

  // Clean up excessive whitespace at the beginning
  processed = processed.replace(/^\s+/, '');

  // If the entire content was just the product name, return empty string
  if (!processed || processed.match(/^\s*$/)) {
    return '';
  }

  return processed;
}

/**
 * Normalizes HTML content structure for consistent rendering
 * @param htmlContent - HTML content to normalize
 * @returns Normalized HTML content
 */
export function normalizeHtmlStructure(htmlContent: string): string {
  if (!htmlContent) return '';

  let normalized = htmlContent;

  // Fix common HTML structure issues
  normalized = normalized
    // Ensure proper closing of self-closing tags
    .replace(/<br(?!\s*\/?>)/gi, '<br />')
    // Fix nested list structures
    .replace(/(<li[^>]*>)\s*(<ul|<ol)/gi, '$1\n$2')
    .replace(/(<\/ul>|<\/ol>)\s*(<\/li>)/gi, '$1\n$2')
    // Ensure proper spacing around block elements
    .replace(/(<\/?(ul|ol|li)[^>]*>)/gi, '\n$1\n')
    // Clean up excessive whitespace
    .replace(/\n\s*\n/g, '\n')
    .replace(/^\s+|\s+$/g, '');

  return normalized;
}

/**
 * Combines processing and sanitization for HTML content
 * @param htmlContent - Raw HTML content from backend
 * @param productName - Optional product name to remove from HTML
 * @returns Processed and sanitized HTML content
 */
export function prepareHtmlContent(
  htmlContent: string,
  productName?: string
): string {
  if (!htmlContent) return '';

  // Step 1: Remove duplicate product name
  let processed = removeDuplicateProductName(htmlContent, productName);

  // Step 2: Sanitize content
  processed = sanitizeHtmlContent(processed);

  // Step 3: Normalize structure
  processed = normalizeHtmlStructure(processed);

  // Step 4: Final processing
  processed = processHtmlContent(processed);

  return processed;
}
