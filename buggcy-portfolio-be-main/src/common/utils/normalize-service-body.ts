/**
 * multipart/form-data sends every field as a string, so arrays, objects,
 * booleans and numbers need to be coerced back before Zod validation runs.
 * Safe to call on a plain JSON body too — it only touches fields that need fixing.
 */
const ARRAY_FIELDS = ['features', 'technologies', 'useCases', 'process', 'stats', 'whyChooseUs', 'faqs'];

function tryParseJson(value: string): any {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

export function normalizeServiceBody(body: Record<string, any>): Record<string, any> {
  const result = { ...body };

  for (const field of ARRAY_FIELDS) {
    if (typeof result[field] === 'string') {
      const parsed = tryParseJson(result[field]);
      if (Array.isArray(parsed)) {
        result[field] = parsed;
      } else if (field === 'features' || field === 'technologies' || field === 'useCases') {
        result[field] = result[field]
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean);
      }
    }
  }

  if (typeof result.isActive === 'string') {
    result.isActive = result.isActive === 'true';
  }

  if (typeof result.order === 'string' && result.order !== '') {
    const n = Number(result.order);
    if (!Number.isNaN(n)) result.order = n;
  }

  return result;
}
