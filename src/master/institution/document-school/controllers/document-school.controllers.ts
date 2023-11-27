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
import * as fs from 'fs';
import { DocumentSchoolService } from '../services/document-school.service';
import { DocSchoolReadDTO } from '../services/dto/document-read.dto';
import { DocSchoolCreateDTO } from '../services/dto/document-create.dto';
import { DocSchoolUpdateDTO } from '../services/dto/document-update.dto';

@Controller('document-schools')
@ApiBearerAuth()
@ApiTags('document-schools')
export class DocumentSchoolController {
  constructor(private readonly docService: DocumentSchoolService) {}

  @Get()
  @ApiOperation({ summary: 'Get all document schools' })
  async findAll(): Promise<DocSchoolReadDTO[]> {
    return await this.docService.getAllDoc();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get all document school by ID' })
  async getOne(@Param('id') id: string): Promise<DocSchoolReadDTO> {
    return await this.docService.getDocById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create document school' })
  @ApiBody({ type: DocSchoolCreateDTO })
  @UseInterceptors(fileUpload('documents-school'))
  async uploadDocument(
    @UploadedFile() file,
    @Body() dtoReq: DocSchoolCreateDTO,
  ): Promise<DocSchoolReadDTO> {
    return await this.docService.save(file, dtoReq);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: DocSchoolUpdateDTO })
  @ApiOperation({ summary: 'Update document school' })
  @UseInterceptors(fileUpload('documents-school'))
  async updateDocument(
    @Param('id') id: string,
    @UploadedFile() file,
    @Body() dtoReq: DocSchoolUpdateDTO,
  ): Promise<DocSchoolReadDTO> {
    const updatedDocument = await this.docService.updateDocument(
      id,
      file,
      dtoReq,
    );
    return updatedDocument;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete document school by id' })
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
  @ApiOperation({ summary: 'View document school' })
  async viewDocument(@Param('id') id: string, @Res() res): Promise<void> {
    const document = await this.docService.getDocById(id);

    const fileStream = fs.createReadStream(document.document);

    res.setHeader('Content-Type', 'application/pdf');
    fileStream.pipe(res);
  }
}
