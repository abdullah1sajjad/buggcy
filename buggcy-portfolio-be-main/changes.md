# Backend Security & Performance Fixes

## Summary
Fixed 16 security, performance, and API documentation issues in the backend, plus additional runtime errors discovered after deployment.

---

## Original 16 Fixes

### 1. Path Traversal Vulnerability (uploads.controller.ts)
**File:** `src/uploads/uploads.controller.ts`

**Issue:** User-supplied `folder` query parameter was directly joined with `UPLOADS_DIR` without sanitization, allowing attackers to use `..` sequences to write files to arbitrary locations.

**Fix:** Added sanitization to remove `..` sequences and validation to ensure the resolved path starts with `UPLOADS_DIR`.

---

### 2. Rate Limiting for Contact Submissions (DoS/Spam Prevention)
**Files:** `src/app.module.ts`, `src/contact-submissions/contact-submissions.controller.ts`

**Issue:** The `POST /contact-submissions` endpoint was public without rate limiting, allowing spam/database flooding.

**Fix:** Installed `@nestjs/throttler` and configured global rate limiting (10 requests per 60 seconds). The `ThrottlerGuard` is now applied globally via `APP_GUARD`.

---

### 3. imageUrl Validation Fix (Industry Schema)
**File:** `src/site-industries/schemas/industry.schema.ts`

**Issue:** `imageUrl` field used `z.string().url()` which requires a full protocol/host, failing for relative upload paths.

**Fix:** Changed `z.string().url()` to `z.string()` to support both absolute URLs and relative paths.

---

### 4. imageUrl Validation Fix (Service Schema)
**File:** `src/site-services/schemas/service.schema.ts`

**Issue:** Both `imageUrl` and `secondaryImageUrl` required full URLs via `z.string().url()`, failing for relative static paths.

**Fix:** Changed both fields from `z.string().url()` to `z.string()`.

---

### 5. @ApiBody Decorator (Contact Submissions Controller)
**File:** `src/contact-submissions/contact-submissions.controller.ts`

**Issue:** `CreateContactSubmissionDto` is a TypeScript type inferred from Zod, so Swagger could not read its fields at runtime.

**Fix:** Added `@ApiBody` decorator with explicit schema properties.

---

### 6. Duplicate bcrypt Dependencies Removed
**Files:** `package.json`, `src/seed.ts`

**Issue:** Both `bcrypt` (native binary) and `bcryptjs` (pure JavaScript) were listed.

**Fix:** Removed `bcrypt` and `@types/bcrypt`, updated `src/seed.ts` to use `bcryptjs`.

---

### 7. JSONB for Success Story Results
**File:** `src/site-success-stories/entities/success-story.entity.ts`

**Fix:** Changed `results` from `simple-json` to `jsonb`.

---

### 8. JSONB for Service Entity
**File:** `src/site-services/entities/service.entity.ts`

**Fix:** Changed `process`, `stats`, `whyChooseUs`, `faqs` from `simple-json` to `jsonb`.

---

### 9. JSONB for Industry Entity
**File:** `src/site-industries/entities/industry.entity.ts`

**Fix:** Changed `challengesDetailed`, `lifecycle`, `approach`, `stats`, `relatedServices`, `testimonials`, `successStories` from `simple-json` to `jsonb`.

---

### 10. Native Text Array for Success Story Technologies
**File:** `src/site-success-stories/entities/success-story.entity.ts`

**Fix:** Changed `technologies` from `simple-array` to `text array`.

---

### 11-13. Native Text Arrays for Service Entity
**File:** `src/site-services/entities/service.entity.ts`

**Fix:** Changed `features`, `technologies`, `useCases` from `simple-array` to `text array`.

---

### 14. Native Text Arrays for Industry Entity
**File:** `src/site-industries/entities/industry.entity.ts`

**Fix:** Changed `features`, `challenges`, `solutions`, `technologies` from `simple-array` to `text array`.

---

### 15-16. @ApiBody Decorators for Success Stories Controller
**File:** `src/site-success-stories/site-success-stories.controller.ts`

**Fix:** Added `@ApiBody` with full schema properties to both create and update endpoints.

---

## Post-Deployment Fixes (Errors from Original 16 Changes)

### Fix A: Database Migration Error - features NOT NULL
**File:** `src/site-services/entities/service.entity.ts`, `src/site-industries/entities/industry.entity.ts`

**Error:**
```
column "features" of relation "site_services" contains null values
ALTER TABLE "site_services" ADD "features" text array NOT NULL
```

**Cause:** Changing `simple-array` to `text array` without `nullable: true` fails because existing rows contain NULL values.

**Fix:** Changed `features` to `nullable: true` in both service and industry entities:
```typescript
@Column('text', { array: true, nullable: true })
features: string[];
```

---

### Fix B: Frontend Null Reference - ServiceSlugDetailPage
**File:** `src/pages/services/ServiceSlugDetailPage.tsx`

**Error:**
```
Cannot read properties of null (reading 'slice')
at ServiceSlugDetailPage (ServiceSlugDetailPage.tsx:151:31)
```

**Cause:** `service.features` is now nullable from DB, but component called `.slice()` directly without null check.

**Fix:** Added null coalescing:
```typescript
{(service.features ?? []).slice(0, 3).map(...)}
{(service.useCases ?? []).map(...)}
{(service.process ?? []).map(...)}
```

---

### Fix C: Frontend Null Reference - IndustriesPage
**File:** `src/pages/industries/IndustriesPage.tsx`

**Error:**
```
Cannot read properties of null (reading 'slice')
```

**Cause:** `industry.features` is now nullable, but component called `.slice()` directly.

**Fix:** Added null coalescing:
```typescript
{(industry.features ?? []).slice(0, 3).map(...)}
```

---

### Fix D: Frontend Null Reference - StoryCard
**File:** `src/components/shared/StoryCard.tsx`

**Error:**
```
Cannot read properties of null (reading 'slice')
at StoryCard (StoryCard.tsx:58:28)
```

**Cause:** `story.results` is now nullable from DB, but component called `.slice()` directly.

**Fix:** Updated interface and added null coalescing:
```typescript
// Interface
results?: StoryResult[] | null;

// Component
{(story.results ?? []).slice(0, 3).map(...)}
```

---

### Fix E: Frontend Null Reference - SuccessStoryDetailPage
**File:** `src/pages/success-stories/SuccessStoryDetailPage.tsx`

**Error:**
```
Cannot read properties of null (reading 'slice'/'map')
```

**Cause:** `project.results` is now nullable.

**Fix:** Added null coalescing at both usage points:
```typescript
{(project.results ?? []).slice(0, 2).map(...)}
{(project.results ?? []).map(...)}
```

---

### Fix F: Update API 400 Bad Request - Zod Validation
**Files:** `src/site-services/schemas/service.schema.ts`, `src/site-industries/schemas/industry.schema.ts`, `src/site-success-stories/schemas/success-story.schema.ts`

**Error:**
```
PUT /api/v1/site-services/{id} 400 (Bad Request)
```

**Cause:** Update schemas used `.partial()` which inherited `.min(1)` constraints from CreateSchema. When updating with empty arrays `[]`, validation failed. Also, `.or(z.literal(''))` caused issues with Zod 4 union semantics for nullable fields.

**Fix:** Rewrote all Update schemas as standalone `z.object()` with relaxed validation:
- Removed `.min(1)` from `features` in update schemas
- Removed `.or(z.literal(''))` - plain `z.string()` accepts empty strings
- All fields use `.optional().nullable()` pattern

---

### Fix G: Uploads Controller - Local Disk to Cloudinary
**File:** `src/uploads/uploads.controller.ts`, `src/main.ts`

**Issue:** Original fix #1 secured the uploads controller but still saved files to local disk (`uploads/` directory). Local disk storage doesn't work in production (e.g., Vercel, Heroku) because the filesystem is ephemeral.

**Fix:** Rewrote uploads controller to use Cloudinary:
```typescript
constructor(private readonly cloudinaryService: CloudinaryService) {}

async uploadImage(@UploadedFile() file: Express.Multer.File, @Query('folder') folder?: string) {
  const subfolder = (folder?.trim() || 'website/images').replace(/\.\./g, '');
  const result = await this.cloudinaryService.uploadBuffer(file.buffer, {
    folder: subfolder,
    resourceType: 'image',
    filename: file.originalname,
  });
  return {
    message: 'Image uploaded successfully',
    data: { url: result.url, publicId: result.publicId, format: result.format, bytes: result.bytes },
  };
}
```

Also removed `useStaticAssets` from `src/main.ts` since files are now on Cloudinary.

---

## All Modified Files

| # | File | Changes |
|---|------|---------|
| 1 | `src/uploads/uploads.controller.ts` | Path traversal fix + Cloudinary upload |
| 2 | `src/app.module.ts` | Added ThrottlerModule + global guard |
| 3 | `src/contact-submissions/contact-submissions.controller.ts` | Rate limiting + @ApiBody |
| 4 | `src/site-industries/schemas/industry.schema.ts` | imageUrl validation + UpdateSchema rewrite |
| 5 | `src/site-services/schemas/service.schema.ts` | imageUrl validation + UpdateSchema rewrite |
| 6 | `src/site-success-stories/schemas/success-story.schema.ts` | UpdateSchema rewrite |
| 7 | `package.json` | Removed bcrypt, added @nestjs/throttler |
| 8 | `src/seed.ts` | Changed import to bcryptjs |
| 9 | `src/site-success-stories/entities/success-story.entity.ts` | jsonb + text array |
| 10 | `src/site-services/entities/service.entity.ts` | jsonb + text array + nullable |
| 11 | `src/site-industries/entities/industry.entity.ts` | jsonb + text array + nullable |
| 12 | `src/site-success-stories/site-success-stories.controller.ts` | @ApiBody decorators |
| 13 | `src/main.ts` | Removed useStaticAssets |
| 14 | `src/pages/services/ServiceSlugDetailPage.tsx` | Null safety for features/useCases/process |
| 15 | `src/pages/industries/IndustriesPage.tsx` | Null safety for features |
| 16 | `src/components/shared/StoryCard.tsx` | Null safety for results + interface fix |
| 17 | `src/pages/success-stories/SuccessStoryDetailPage.tsx` | Null safety for results |

---

## Post-Deployment Notes

1. **Database Migration Required:** Schema changes (jsonb, text arrays, nullable) require TypeORM `synchronize: true` or manual migration.
2. **Cloudinary Config Required:** Ensure `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` are set in `.env`.
3. **Rate Limiting:** Global rate limit is 10 requests per 60 seconds. Adjust in `ThrottlerModule.forRoot()` if needed.
4. **Existing Images:** Existing images stored on local disk (`uploads/` directory) will no longer be served. Re-upload them through the admin panel to store on Cloudinary.
