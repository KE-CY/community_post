import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user: string

    @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @Column({ name: 'post_id' })
    postId: number;

    @Column()
    content: string;

    @Column({ default: null, comment: "parent comment id", name: 'parent_comment_id' })
    parentCommentId: number;

    @Column({ default: 1 })
    level: number;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deletedAt' })
    deletedAt: Date;
}