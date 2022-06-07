import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/entity/post.entity';
import { CreatePostDTO } from 'src/dto/post.create.dto';
import { UpdatePostDTO } from 'src/dto/post.update.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) { }

    async findAll(): Promise<Post[]> {
        return await this.postRepository.find();
    }

    async findById(id: number): Promise<Post | null> {
        return await this.postRepository.findOne({ where: { id } });
    }

    async create(p: CreatePostDTO): Promise<Post> {
        return await this.postRepository.save(p);
    }

    async update(id: number, p: UpdatePostDTO): Promise<boolean> {
        const foundPost = await this.postRepository.findOne({ where: { id } });
        if (!foundPost) {
            throw new HttpException('post not found', 404);
        }
        return (await this.postRepository.save({
            ...foundPost,
            ...p,
        })) ? true : false;
    }

    async remove(id: number): Promise<boolean> {
        const foundPost = await this.postRepository.findOne({ where: { id } });
        if (!foundPost) {
            throw new HttpException('post not found', 404);
        }
        return (await this.postRepository.delete(id)) ? true : false;
    }

}
