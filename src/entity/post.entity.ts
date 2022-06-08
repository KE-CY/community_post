import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user: string

    @Column()
    content: string;

    @OneToMany(() => Comment, comment => comment.post, { onDelete: 'CASCADE' })
    comments: Comment[];

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deletedAt' })
    deletedAt: Date;
}