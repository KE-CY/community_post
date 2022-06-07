import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/entity/comment.entity';
import { CreateCommentDTO } from 'src/dto/comment.create.dto';
import { PostService } from '../post/post.service';
import { UpdateCommentDTO } from 'src/dto/comment.update.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        private postService: PostService
    ) { }

    async findById(id: number): Promise<Comment | null> {
        return await this.commentRepository.findOne({ where: { id } });
    }

    async create(c: CreateCommentDTO): Promise<Comment> {
        const comment = new Comment();
        comment.content = c.content;
        const foundPost = await this.postService.findById(c.postId);
        if (!foundPost) {
            throw new HttpException('post not found', 404);
        }
        comment.post = foundPost;
        return await this.commentRepository.save(comment);
    }

    async update(id: number, c: UpdateCommentDTO): Promise<boolean> {
        const foundPost = await this.postService.findById(c.postId);
        if (!foundPost) {
            return false;
        }
        const foundComment = await this.commentRepository.findOne({ where: { id } });
        if (!foundComment) {
            return false;
        }
        const comment = new Comment();
        comment.id = id;
        comment.content = c.content;
        comment.post = foundPost;
        return (await this.commentRepository.update(comment.id, comment)) ? true : false;
    }

    async remove(id: number): Promise<boolean> {
        const foundPost = await this.commentRepository.findOne({ where: { id } });

        if (!foundPost) {
            return false;
        }
        return (await this.commentRepository.delete(id)) ? true : false;
    }

}
