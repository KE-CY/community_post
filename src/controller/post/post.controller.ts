import { Controller, Get, Param, HttpStatus, Post, Body, Response, Patch, Delete } from '@nestjs/common';
import { CreatePostDTO } from 'src/dto/post.create.dto';
import { PostService } from 'src/service/post/post.service';
import { UpdatePostDTO } from 'src/dto/post.update.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get()
    async getAll(@Response() res) {
        const data = await this.postService.findAll();
        res.status(HttpStatus.OK).json(data)
    }

    @Get('/top10') // 需更改為留言最多的10資料
    async getTop10(@Response() res) {
        const data = await this.postService.findTop10();
        res.status(HttpStatus.OK).json(data)
    }

    @Post()
    async create(@Body() createPostDTO: CreatePostDTO, @Response() res) {
        try {
            await this.postService.create(createPostDTO);
            res.status(HttpStatus.OK).json({ status: 'success' });
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/:id')
    async update(@Response() res, @Param('id') id: number, @Body() updatePostDTO: UpdatePostDTO) {
        try {
            const isUpdate = await this.postService.update(id, updatePostDTO)
            res.status(HttpStatus.OK).json({ status: isUpdate ? 'success' : 'fail' });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id')
    async delete(@Response() res, @Param('id') id: number) {
        try {
            const isDelete = await this.postService.remove(id);
            res.status(HttpStatus.OK).json({ status: isDelete ? 'success' : 'fail' });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
