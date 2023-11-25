import { PartialType } from '@nestjs/swagger';
import { VillageCreateDTO } from './village-create.dto';

export class VillageUpdateDTO extends PartialType(VillageCreateDTO) {}
