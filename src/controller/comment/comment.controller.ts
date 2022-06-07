import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { CreateCommentDTO } from 'src/dto/comment.create.dto';
import { CommentService } from 'src/service/comment/comment.service';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Post()
    async create(@Body() createCommentDTO: CreateCommentDTO, @Response() res) {
        try {
            // await this.commentService.create(createPostDTO);
            res.status(HttpStatus.OK).json({ status: 'success' });
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
