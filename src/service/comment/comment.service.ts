import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/entity/comment.entity';
import { CreateCommentDTO } from 'src/dto/comment.create.dto';
import { PostService } from '../post/post.service';
import { UpdateCommentDTO } from 'src/dto/comment.update.dto';
import { ReplyCommentDTO } from 'src/dto/comment.reply.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        private postService: PostService
    ) { }

    async findById(id: number): Promise<Comment | null> {
        return await this.commentRepository.findOne({ where: { id } })
    }

    async checkoutParent(id: number): Promise<boolean> {
        const comment = await this.commentRepository.findOne({ where: { id } })
        return (comment.parentCommentId) ? true : false;
    }

    async create(c: CreateCommentDTO): Promise<boolean> {
        const foundPost = await this.postService.findById(c.postId);
        if (!foundPost) {
            // throw new HttpException('post not found', 404);
            return false;
        }
        const comment = new Comment();
        comment.user = c.user;
        comment.content = c.content;
        comment.post = foundPost;
        return (await this.commentRepository.save(comment)) ? true : false;
    }

    async reply(commentId: number, r: ReplyCommentDTO): Promise<boolean> {
        const foundComment = await this.commentRepository.findOne({ where: { id: commentId } });
        if (!foundComment) {
            // throw new HttpException('comment not found', 404);
            return false;
        }
        const comment = new Comment();
        Object.assign(comment, r);
        comment.parentCommentId = foundComment.id;
        comment.level = foundComment.level + 1;
        return (await this.commentRepository.save(comment)) ? true : false;
    }

    async update(id: number, c: UpdateCommentDTO): Promise<boolean> {
        const foundPost = await this.postService.findById(c.postId);
        if (!foundPost) {
            return false;
        }
        const foundComment = await this.commentRepository.findOne({ where: { id } });
        if (!foundComment || foundComment.user != c.user) {
            return false;
        }
        const comment = new Comment();
        comment.id = id;
        comment.user = c.user;
        comment.content = c.content;
        comment.post = foundPost;
        return (await this.commentRepository.update(comment.id, comment)) ? true : false;
    }

    async remove(id: number): Promise<boolean> {
        const foundPost = await this.commentRepository.findOne({ where: { id } });
        if (!foundPost) {
            return false;
        }
        return (await this.commentRepository.createQueryBuilder().delete().where("id = :id or parent_comment_id = :id", { id: id }).execute()) ? true : false;
    }

}
