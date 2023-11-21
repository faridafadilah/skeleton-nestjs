/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { RegionDTO } from '../../../region/service/dto/region.dto';

export class CountryDTORead {
    @AutoMap()
    id: number;

    @AutoMap()
    @IsString()
    countryName: string;

    @AutoMap(() => RegionDTO)
    region: RegionDTO;
}
