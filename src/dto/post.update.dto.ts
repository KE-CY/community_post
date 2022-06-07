import { IsString, IsOptional } from 'class-validator';

export class UpdatePostDTO {
    @IsOptional()
    @IsString()
    readonly content: string;

    @IsOptional()
    @IsString()
    readonly image: string;

}