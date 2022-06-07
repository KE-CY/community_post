import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment.entity';
import { CommentController } from 'src/controller/comment/comment.controller';
import { CommentService } from 'src/service/comment/comment.service';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentService],
    controllers: [CommentController],
})
export class CommentModule { }
