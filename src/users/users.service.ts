import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}
  
  create(dto: CreateUserDto): User {
    var uniqueId: string = randomUUID();

    return this.repository.create(
      new User({
        id: uniqueId,
        cpf: dto.cpf,
        email: dto.email,
        password: dto.password
      })
    );
  }

  findAll() {
    return `This action returns all users`;
  }

  async getById(search: string): Promise<User> {
    return this.repository.getById(search);
  }

  async getByEmail(search: string): Promise<User> {
    return this.repository.getByEmail(search);
  }

  async getByCpf(search: string): Promise<User> {
    return this.repository.getByCpf(search);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
