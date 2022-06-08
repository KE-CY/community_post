import { Body, Param, Controller, HttpStatus, Patch, Post, Response, Delete } from '@nestjs/common';
import { CreateCommentDTO } from 'src/dto/comment.create.dto';
import { UpdateCommentDTO } from 'src/dto/comment.update.dto';
import { ReplyCommentDTO } from 'src/dto/comment.reply.dto';
import { CommentService } from 'src/service/comment/comment.service';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Post()
    async create(@Body() createCommentDTO: CreateCommentDTO, @Response() res) {
        try {
            const isCreate = await this.commentService.create(createCommentDTO);
            res.status(HttpStatus.OK).json({ status: isCreate ? 'success' : 'fail' });
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/:id')
    async reply(@Body() replyCommentDTO: ReplyCommentDTO, @Param('id') commentId: number, @Response() res) {
        try {
            const isReply = await this.commentService.reply(commentId, replyCommentDTO);
            res.status(HttpStatus.OK).json({ status: isReply ? 'success' : 'fail' });
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/:id')
    async update(@Response() res, @Param('id') id: number, @Body() updateCommentDTO: UpdateCommentDTO) {
        try {
            const isUpdate = await this.commentService.update(id, updateCommentDTO)
            res.status(HttpStatus.OK).json({ status: isUpdate ? 'success' : 'fail' });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id')
    async delete(@Response() res, @Param('id') id: number) {
        try {
            const isDelete = await this.commentService.remove(id);
            res.status(HttpStatus.OK).json({ status: isDelete ? 'success' : 'fail' });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
