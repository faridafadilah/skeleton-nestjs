import { PartialType } from '@nestjs/swagger';
import { ProvinceCreateDTO } from './province-create.dto';

export class ProvinceUpdateDTO extends PartialType(ProvinceCreateDTO) {}
