import { PartialType } from '@nestjs/swagger';
import { RegencyCreateDTO } from './regency-create.dto';

export class RegencyUpdateDTO extends PartialType(RegencyCreateDTO) {}
