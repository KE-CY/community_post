import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDTO {
    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @IsNotEmpty()
    @IsString()
    readonly postId: number;

}