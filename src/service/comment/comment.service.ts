import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/entity/comment.entity';
import { CreateCommentDTO } from 'src/dto/comment.create.dto';
import { PostService } from '../post/post.service';

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

    async create(c: Comment): Promise<Comment> {
        // const post = await this.postService.findById(c.postId);
        // const newComment = this.create({ ...c, post })
        return await this.commentRepository.save(c);
    }

    async remove(id: number): Promise<boolean> {
        const foundPost = await this.commentRepository.findOne({ where: { id } });
        if (!foundPost) {
            throw new HttpException('comment not found', 404);
        }
        return (await this.commentRepository.delete(id)) ? true : false;
    }

}
