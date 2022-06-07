import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from 'src/controller/post/post.controller';
import { PostService } from 'src/service/post/post.service';
import { Post } from 'src/entity/post.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    providers: [PostService],
    controllers: [PostController],
    exports: [PostService],
})
export class PostModule { }
