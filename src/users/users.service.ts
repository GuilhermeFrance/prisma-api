import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UserEntity } from './entities/user.entity';
import { UnauthorizedError } from 'src/common/filters/http-exception/errors/types/UnauthorizedError';
import { NotFoundError } from 'src/common/filters/http-exception/errors/types/NotFOundError';
@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}
  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.repository.create(createUserDto);
  }

  findAll(): Promise<UserEntity[]> {
    throw new UnauthorizedError('Não autorizado');
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.repository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
