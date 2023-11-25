import { PartialType } from '@nestjs/mapped-types';
import { DistrictCreateDTO } from './district-create.dto';

export class DistrictUpdateDTO extends PartialType(DistrictCreateDTO) {}
