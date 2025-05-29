/**
 * Test file to demonstrate HTML processing functionality
 * Run this with: node -r esbuild-register src/utils/__tests__/htmlUtils.test.ts
 * Or include in your test suite
 */

import {
  removeDuplicateProductName,
  prepareHtmlContent,
  normalizeHtmlStructure,
} from '../htmlUtils';

// Test data similar to your backend response
const testHtmlContent = {
  uk: '<strong><h1>lilili</h1></strong><br>\n      <ul>\n        \n            <li>sdsdsd\n              \n      <ul>\n        \n            <li>sdsdssd\n              \n            </li>\n          \n      </ul>\n    \n            </li>\n          \n            <li>sdsdsd\n              \n            </li>\n          \n      </ul>\n    ',
  en: '<strong><h1>lilili</h1></strong><br>\n      <ul>\n        \n            <li>sdsdsdsdds\n              \n      <ul>\n        \n            <li>sdsdsdsds\n              \n            </li>\n          \n      </ul>\n    \n            </li>\n          \n            <li>sdsdsd\n              \n            </li>\n          \n      </ul>\n    ',
};

const productName = 'lilili';

console.log('=== HTML Processing Test ===\n');

console.log('1. Original HTML (UK):');
console.log(testHtmlContent.uk);
console.log('\n');

console.log('2. After removing duplicate product name:');
const withoutDuplicate = removeDuplicateProductName(
  testHtmlContent.uk,
  productName
);
console.log(withoutDuplicate);
console.log('\n');

console.log('3. After full processing:');
const fullyProcessed = prepareHtmlContent(testHtmlContent.uk, productName);
console.log(fullyProcessed);
console.log('\n');

console.log('4. Testing edge cases:');

// Test case where product name doesn't match exactly
const edgeCase1 =
  '<strong><h1>Different Product Name</h1></strong><br><ul><li>Item 1</li></ul>';
console.log('Edge case 1 (non-matching name):');
console.log('Before:', edgeCase1);
console.log('After:', prepareHtmlContent(edgeCase1, productName));
console.log('\n');

// Test case with just the product name (should return empty)
const edgeCase2 = '<strong><h1>lilili</h1></strong>';
console.log('Edge case 2 (only product name):');
console.log('Before:', edgeCase2);
console.log('After:', prepareHtmlContent(edgeCase2, productName));
console.log('\n');

// Test case with no h1 tags
const edgeCase3 = '<p>Just some content</p><ul><li>Item 1</li></ul>';
console.log('Edge case 3 (no h1 tags):');
console.log('Before:', edgeCase3);
console.log('After:', prepareHtmlContent(edgeCase3, productName));
console.log('\n');

console.log('=== Test Complete ===');
