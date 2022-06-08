import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdatePostDTO {
    @IsString()
    @IsNotEmpty()
    readonly user: string;

    @IsOptional()
    @IsString()
    readonly content: string;

}