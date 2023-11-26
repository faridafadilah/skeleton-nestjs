/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
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
import { fileUpload } from 'src/common/base/base-file';
import { DocumentFoundationService } from '../services/document-foundation.service';
import { CreateDocFondationDTO } from '../services/dto/document-create.dto';
import { DocFoundationUpdateDTO } from '../services/dto/document-update.dto';
import { DocFoundationReadDTO } from '../services/dto/document-read.dto';
import * as fs from 'fs';

@Controller('document-foundations')
@ApiBearerAuth()
@ApiTags('document-foundations')
export class DocumentFoundationController {
  constructor(private readonly docService: DocumentFoundationService) {}

  @Get()
  async findAll(): Promise<any> {
    return await this.docService.getAllDoc();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<DocFoundationReadDTO> {
    return await this.docService.getDocById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateDocFondationDTO })
  @UseInterceptors(fileUpload('documents-foundation'))
  async uploadDocument(
    @UploadedFile() file,
    @Body() dtoReq: CreateDocFondationDTO,
  ): Promise<DocFoundationReadDTO> {
    return await this.docService.save(file, dtoReq);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: DocFoundationUpdateDTO })
  @UseInterceptors(fileUpload('documents-foundation'))
  async updateDocument(
    @Param('id') id: string,
    @UploadedFile() file,
    @Body() dtoReq: DocFoundationUpdateDTO,
  ): Promise<DocFoundationReadDTO> {
    const updatedDocument = await this.docService.updateDocument(
      id,
      file,
      dtoReq,
    );
    return updatedDocument;
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Document deleted successfully' })
  async deleteDocument(@Param('id') id: string): Promise<void> {
    return await this.docService.deleteDocument(id);
  }

  @Get('download/:id')
  @ApiOperation({ summary: 'Download document by ID' })
  @ApiResponse({ status: 200, description: 'Returns the document file' })
  async downloadDocument(@Param('id') id: string, @Res() res): Promise<void> {
    const document = await this.docService.getDocById(id);

    const fileStream = fs.createReadStream(document.document);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${document.name}`,
    );
    fileStream.pipe(res);
  }

  @Get('view/:id')
  async viewDocument(@Param('id') id: string, @Res() res): Promise<void> {
    const document = await this.docService.getDocById(id);

    const fileStream = fs.createReadStream(document.document);

    res.setHeader('Content-Type', 'application/pdf');
    fileStream.pipe(res);
  }
}
