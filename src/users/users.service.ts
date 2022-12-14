import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}
  
  create(dto: CreateUserDto) {
    var uniqueId: string = randomUUID();

    this.repository.create(
      new User({
        id: uniqueId,
        cpf: dto.cpf,
        email: dto.email,
        password: dto.password
      })
    );

    console.log(uniqueId);
  }

  findAll() {
    return `This action returns all users`;
  }

  getById(search: string) {
    return this.repository.getById(search);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
