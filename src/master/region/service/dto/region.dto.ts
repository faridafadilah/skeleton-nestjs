/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

/**
 * A RegionDTO object.
 */
export class RegionDTO {
    @AutoMap()
    id: number;
    
    @AutoMap()
    @IsString()
    regionName: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
