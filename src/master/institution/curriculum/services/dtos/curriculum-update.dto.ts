import { PartialType } from '@nestjs/swagger';
import { CurriculumCreateDTO } from './curriculum-create.dto';

export class CurriculumUpdateDTO extends PartialType(CurriculumCreateDTO) {}
