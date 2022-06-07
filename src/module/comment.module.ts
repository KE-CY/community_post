import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment.entity';
import { CommentController } from 'src/controller/comment/comment.controller';
import { CommentService } from 'src/service/comment/comment.service';
import { PostService } from 'src/service/post/post.service';
import { PostModule } from './post.module';

@Module({
    imports: [TypeOrmModule.forFeature([Comment]), PostModule],
    providers: [CommentService],
    controllers: [CommentController],
})
export class CommentModule { }
