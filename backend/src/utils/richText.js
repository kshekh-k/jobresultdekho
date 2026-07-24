'use strict';

// Strapi Blocks (rich text) fields are arrays of block nodes, not plain strings.
function blocksToText(value) {
  if (typeof value === 'string') return value;
  if (!Array.isArray(value)) return '';
  return value
    .map((block) => (block.children || []).map((child) => child.text || '').join(''))
    .filter(Boolean)
    .join('\n');
}

module.exports = { blocksToText };
