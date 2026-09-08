/**
 * multipart/form-data sends every field as a string, so arrays and numbers
 * need to be coerced back before Zod validation runs.
 * Safe to call on a plain JSON body too — it only touches fields that need fixing.
 */
export function normalizeMultipartBody(body: Record<string, any>): Record<string, any> {
  const result = { ...body };

  if (typeof result.tags === 'string') {
    try {
      const parsed = JSON.parse(result.tags);
      result.tags = Array.isArray(parsed) ? parsed : [result.tags];
    } catch {
      result.tags = result.tags
        .split(',')
        .map((t: string) => t.trim())
        .filter(Boolean);
    }
  }

  if (typeof result.readTimeMinutes === 'string' && result.readTimeMinutes !== '') {
    const n = Number(result.readTimeMinutes);
    if (!Number.isNaN(n)) result.readTimeMinutes = n;
  }

  return result;
}
