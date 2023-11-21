/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CountryDTO {
    @AutoMap()
    id: number;

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    countryName: string;

    @AutoMap()
    @IsNumber()
    @IsNotEmpty()
    idRegion: number;
}
