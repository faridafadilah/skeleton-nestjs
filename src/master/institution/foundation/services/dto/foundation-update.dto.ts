import { PartialType } from '@nestjs/swagger';
import { FoundationCreateDTO } from './foundation-create.dto';

export class FoundationUpdateDTO extends PartialType(FoundationCreateDTO) {}
