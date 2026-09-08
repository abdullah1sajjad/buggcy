import {
  Controller, Post, UseGuards, UseInterceptors,
  UploadedFile, BadRequestException, Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import { imageMulterOptions } from './multer.config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/enums/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload a website image [ADMIN, HR, BD]' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({ name: 'folder', required: false, example: 'website/images' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(FileInterceptor('file', imageMulterOptions))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    if (!file) throw new BadRequestException('No image file provided');

    const subfolder = (folder?.trim() || 'website/images').replace(/\.\./g, '');

    const result = await this.cloudinaryService.uploadBuffer(file.buffer, {
      folder: subfolder,
      resourceType: 'image',
      filename: file.originalname,
    });

    return {
      message: 'Image uploaded successfully',
      data: {
        url: result.url,
        publicId: result.publicId,
        format: result.format,
        bytes: result.bytes,
      },
    };
  }
}
