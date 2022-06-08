import { Injectable } from '@nestjs/common';
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
        return await this.postRepository.find({ relations: ["comments"] });
    }

    async findTop10(): Promise<Post[]> {
        //  SELECT p.* FROM post p LEFT JOIN comment c ON c.postId = p.id GROUP BY p.id ORDER BY  COUNT(c.postId) DESC limit 10;
        // SELECT p.* FROM post p LEFT JOIN comment c ON c.post_id = p.id GROUP BY p.id ORDER BY  COUNT(c.post_id) DESC limit 10;
        //  SELECT p.*, COUNT(c.postId) as count FROM post p LEFT JOIN comment c ON c.postId = p.id GROUP BY p.id ORDER BY count DESC limit 10;
        console.log(this.postRepository.find({ relations: ["comments"] }));
        return await this.postRepository.query(`SELECT p.* FROM post p LEFT JOIN comment c ON c.post_id = p.id GROUP BY p.id ORDER BY  COUNT(c.post_id) DESC limit 10;`);
    }

    async findById(id: number): Promise<Post | null> {
        return await this.postRepository.findOne({ where: { id } });
    }

    async create(p: CreatePostDTO): Promise<Post> {
        return await this.postRepository.save(p);
    }

    async update(id: number, p: UpdatePostDTO): Promise<boolean> {
        const foundPost = await this.postRepository.findOne({ where: { id } });
        if (!foundPost || foundPost.user != p.user) {
            return false;
        }
        return (await this.postRepository.save({
            ...foundPost,
            ...p,
        })) ? true : false;
    }

    async remove(id: number): Promise<boolean> {
        const foundPost = await this.postRepository.findOne({ where: { id } });
        if (!foundPost) {
            return false;
        }
        return (await this.postRepository.delete(id)) ? true : false;
    }

}
