import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDTO {
    @IsString()
    @IsNotEmpty()
    readonly user: string;

    @IsString()
    @IsNotEmpty()
    readonly content: string;

}