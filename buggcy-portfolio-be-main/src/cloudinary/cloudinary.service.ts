import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse, v2 as CloudinaryType } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CLOUDINARY } from './cloudinary.provider';

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  format?: string;
  bytes?: number;
  resourceType: string;
}

@Injectable()
export class CloudinaryService {
  constructor(@Inject(CLOUDINARY) private readonly cloudinary: typeof CloudinaryType) {}

  /**
   * Upload a file buffer to Cloudinary.
   * resourceType:
   *   - 'image' for photos (jpg, png, webp, etc.)
   *   - 'raw'   for PDFs / docs (resumes, CVs)
   *   - 'auto'  lets Cloudinary detect it
   */
  uploadBuffer(
    buffer: Buffer,
    options: {
      folder: string;
      resourceType?: 'image' | 'raw' | 'auto' | 'video';
      filename?: string;
    },
  ): Promise<CloudinaryUploadResult> {
    const { folder, resourceType = 'auto', filename } = options;

    // For 'raw' assets (PDFs, Word docs, etc.) Cloudinary does NOT append
    // the file extension to the delivery URL automatically — it has to be
    // baked into the public_id itself, otherwise downloaded files end up
    // with no extension (e.g. "Lecture_21" instead of "Lecture_21.pdf").
    let publicId: string | undefined;
    if (filename) {
      const extMatch = filename.match(/\.[^/.]+$/);
      const ext = extMatch ? extMatch[0] : '';
      const base = filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_');
      publicId = resourceType === 'raw' ? `${base}${ext}` : base;
    }

    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
          // keep original filename visible in the Cloudinary URL where possible
          public_id: publicId,
          use_filename: !!filename,
          unique_filename: true,
          overwrite: false,
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            return reject(
              new BadRequestException(`Cloudinary upload failed: ${error?.message ?? 'unknown error'}`),
            );
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            bytes: result.bytes,
            resourceType: result.resource_type,
          });
        },
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  }

  async destroy(publicId: string, resourceType: 'image' | 'raw' | 'video' = 'image'): Promise<void> {
    await this.cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  }

  /**
   * Extract the Cloudinary public_id from a full URL and delete it.
   * URL format: https://res.cloudinary.com/{cloud}/{type}/upload/{version?}/{public_id}.{ext}
   */
  async destroyByUrl(url: string): Promise<void> {
    if (!url) return;
    try {
      const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)\.[^.]+$/);
      if (!match) return;
      const publicId = match[1];
      const resourceType = url.includes('/raw/') ? 'raw' : 'image';
      await this.destroy(publicId, resourceType as 'image' | 'raw');
    } catch {
      // Silently ignore — image may already be deleted or URL may not be Cloudinary
    }
  }
}
