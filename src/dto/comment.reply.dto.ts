import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ReplyCommentDTO {
    @IsString()
    @IsNotEmpty()
    readonly user: string;

    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @IsNotEmpty()
    @IsNumber()
    readonly postId: number;

}