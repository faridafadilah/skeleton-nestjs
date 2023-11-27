import { PartialType } from '@nestjs/swagger';
import { DocSchoolCreateDTO } from './document-create.dto';

export class DocSchoolUpdateDTO extends PartialType(DocSchoolCreateDTO) {}
