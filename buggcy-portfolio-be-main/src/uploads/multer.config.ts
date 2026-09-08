import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';

export const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
export const PDF_MIME_TYPE = 'application/pdf';
export const RESUME_MIME_TYPES = [PDF_MIME_TYPE, 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;   // 5MB
export const MAX_RESUME_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export const imageMulterOptions = {
  storage: memoryStorage(),
  limits: { fileSize: MAX_IMAGE_SIZE_BYTES },
  fileFilter: (_req: any, file: Express.Multer.File, cb: (err: Error | null, accept: boolean) => void) => {
    if (!IMAGE_MIME_TYPES.includes(file.mimetype)) {
      return cb(new BadRequestException('Only image files are allowed (jpg, png, webp, gif, svg)'), false);
    }
    cb(null, true);
  },
};

export const resumeMulterOptions = {
  storage: memoryStorage(),
  limits: { fileSize: MAX_RESUME_SIZE_BYTES },
  fileFilter: (_req: any, file: Express.Multer.File, cb: (err: Error | null, accept: boolean) => void) => {
    if (!RESUME_MIME_TYPES.includes(file.mimetype)) {
      return cb(new BadRequestException('Only PDF or Word documents are allowed for resumes'), false);
    }
    cb(null, true);
  },
};

// Types accepted for job-specific custom "File Upload" fields designed via
// the Application Form Builder (e.g. certificates, work samples), in
// addition to whatever is accepted for the resume itself.
export const CUSTOM_FIELD_FILE_MIME_TYPES = [...RESUME_MIME_TYPES, ...IMAGE_MIME_TYPES];

// Used with AnyFilesInterceptor on the "apply" endpoint, since a job
// application can contain the fixed `resume` file plus any number of
// dynamic custom file fields (fieldname = the custom field's id). The
// `resume` field keeps the stricter PDF/Word-only rule; other fieldnames
// fall back to the broader custom-field allowlist.
export const applicationFilesMulterOptions = {
  storage: memoryStorage(),
  limits: { fileSize: MAX_RESUME_SIZE_BYTES },
  fileFilter: (_req: any, file: Express.Multer.File, cb: (err: Error | null, accept: boolean) => void) => {
    if (file.fieldname === 'resume') {
      if (!RESUME_MIME_TYPES.includes(file.mimetype)) {
        return cb(new BadRequestException('Only PDF or Word documents are allowed for resumes'), false);
      }
      return cb(null, true);
    }
    if (!CUSTOM_FIELD_FILE_MIME_TYPES.includes(file.mimetype)) {
      return cb(new BadRequestException('Unsupported file type uploaded for a custom application field'), false);
    }
    cb(null, true);
  },
};
