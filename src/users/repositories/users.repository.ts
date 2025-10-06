import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { NotFoundError } from 'src/common/filters/http-exception/errors/types/NotFOundError';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: createUserDto,
      include: {
        posts: {},
      },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundError(`Usuário com o ${id} não encontrado.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  remove(id: number): Promise<UserEntity> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
