/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DocumentFoundationRepository } from './document.repository';
import { DocumentFoundation } from './entities/documen.entity';
import { FoundationRepository } from '../foundation/repositories/foundation.repository';
@Injectable()
export class DocumentFoundationService {
  constructor(
    private readonly foundationDocRepository: DocumentFoundationRepository,
    private readonly foundationRepository: FoundationRepository,
  ) {}

  async save(photo: Express.Multer.File): Promise<any> {
    const entity = new DocumentFoundation();
    entity.name = photo.filename;
    entity.document = photo.path;
    entity.expiredAt = new Date();
    const id = '9fa5ca02-905f-450f-b4c1-124fe1cabd56';
    const foundation = await this.foundationRepository.findOneBy({ id });
    if (!foundation) throw new Error(`update error: id is empty.`);
    entity.foundation = foundation;
    const result = await this.foundationDocRepository.save(entity);
    return result;
  }
}
