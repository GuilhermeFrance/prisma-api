import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostEntity } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { NotFoundError } from 'src/common/filters/http-exception/errors/types/NotFOundError';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { authorEmail } = createPostDto;

    delete createPostDto.authorEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        email: authorEmail,
      },
    });
    if (!user) {
      throw new NotFoundError('Author not found');
    }

    const data: Prisma.PostCreateInput = {
      ...createPostDto,
      author: {
        connect: { email: authorEmail },
      },
    };

    return this.prisma.post.create({
      data,
    });
  }

  async findAll(): Promise<PostEntity[]> {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<PostEntity> {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    if (!post) {
      throw new NotFoundException(`Post with id: ${id} não encontrado `);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const { authorEmail } = updatePostDto;

    if (!authorEmail) {
      return this.prisma.post.update({
        data: updatePostDto,
        where: { id },
      });
    }

    delete updatePostDto.authorEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    if (!user) {
      throw new NotFoundError(`Author not found`);
    }
    const data: Prisma.PostUpdateInput = {
      ...updatePostDto,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };

    return this.prisma.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<PostEntity> {
    const post = await this.prisma.post.delete({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException(`Post with id: ${id} não encontrado`);
    }
    return post;
  }
}
