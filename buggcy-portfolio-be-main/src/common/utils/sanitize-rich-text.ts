import sanitizeHtml = require('sanitize-html');

/**
 * Sanitizes rich-text HTML (e.g. from TinyMCE editor) before it is
 * persisted to the DB. Strips <script>, event handlers (onclick, etc.),
 * javascript: URLs and any tag/attribute not explicitly allow-listed,
 * while still allowing the formatting TinyMCE produces (headings, lists,
 * tables, links, images, text alignment/color, etc.).
 */
export function sanitizeRichText(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr', 'blockquote', 'pre', 'code',
      'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'sub', 'sup', 'span',
      'ul', 'ol', 'li',
      'a', 'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
      'div',
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel', 'title'],
      img: ['src', 'alt', 'title', 'width', 'height', 'style'],
      span: ['style'],
      div: ['style'],
      p: ['style'],
      h1: ['style'], h2: ['style'], h3: ['style'], h4: ['style'], h5: ['style'], h6: ['style'],
      td: ['colspan', 'rowspan', 'style'],
      th: ['colspan', 'rowspan', 'style'],
      table: ['style'],
      '*': ['class'],
    },
    // Only allow safe, harmless CSS properties inline (alignment, color, size).
    allowedStyles: {
      '*': {
        'text-align': [/^left$|^right$|^center$|^justify$/],
        color: [/^#[0-9a-f]{3,6}$/i, /^rgb\(/],
        'background-color': [/^#[0-9a-f]{3,6}$/i, /^rgb\(/],
        'font-size': [/^\d+(?:px|em|rem|%)$/],
        'font-weight': [/^\d+$|^bold$|^normal$/],
        width: [/^\d+(?:px|%)$/],
        height: [/^\d+(?:px|%)$/],
      },
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
      img: ['http', 'https', 'data'],
    },
    // Force safe rel/target on any link that opens in a new tab
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, rel: 'noopener noreferrer' },
      }),
    },
    disallowedTagsMode: 'discard',
  }).trim();
}
