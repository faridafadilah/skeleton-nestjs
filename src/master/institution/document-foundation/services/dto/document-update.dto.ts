import { PartialType } from '@nestjs/swagger';
import { CreateDocFondationDTO } from './document-create.dto';

export class DocFoundationUpdateDTO extends PartialType(
  CreateDocFondationDTO,
) {}
