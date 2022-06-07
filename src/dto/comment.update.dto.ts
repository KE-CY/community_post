import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCommentDTO {
    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @IsNotEmpty()
    @IsString()
    readonly postId: number;

}