import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDTO {
    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @IsNotEmpty()
    @IsString()
    readonly image: string;

}