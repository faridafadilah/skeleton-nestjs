/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post as PostMethod,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { JwtAuthGuard } from 'src/authentication/guards/auth.guard';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { Request } from 'express';
import { User } from 'src/authentication/user/entities/user.entity';
import { DocumentFoundationService } from './document.service';
import { fileUpload } from 'src/common/base/base-file';

@Controller('doc-foundation')
@ApiBearerAuth()
@ApiTags('doc-foundation')
export class DocFoundationController {
  constructor(private readonly foundationService: DocumentFoundationService) {}
  @PostMethod('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(fileUpload('doc_image'))
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        doc_image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a document for foundation' })
  async post(
    @Req() req: Request,
    @UploadedFile('file') photo: Express.Multer.File,
  ): Promise<any> {
    return await this.foundationService.save(photo);
  }
}
