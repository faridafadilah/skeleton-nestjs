import { PartialType } from '@nestjs/swagger';
import { SchoolCreateDTO } from './school-create.dto';

export class SchoolUpdateDTO extends PartialType(SchoolCreateDTO) {}
