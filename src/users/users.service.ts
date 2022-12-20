import { ConflictException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { SaltConfigurations } from 'src/auth/constants';
import * as crypto from 'crypto';
import { ServiceException } from 'src/commons/exceptions/service-exception';
import { ErrorsConst } from 'src/commons/exceptions/error-def.entity';
import { AuthService } from 'src/auth/auth.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository
  ) {}
  
  private async hashPass(pass: string) {
    var hash = crypto.createHash('sha512').update(pass + SaltConfigurations.seed).digest("hex");
    return hash;
  }

  async create(dto: CreateUserDto): Promise<User> {
    var uniqueId: string = randomUUID();
    var currUser: User = await this.getByCpf(dto.cpf) || await this.getByEmail(dto.email);

    if (currUser) {
      throw new ServiceException({
        errorDef: ErrorsConst.alreadyExists,
        description: "Cpf or e-mail are already registered"
      });
    }

    var user: User = await this.repository.create(
      new User({
        id: uniqueId,
        cpf: dto.cpf,
        email: dto.email,
        password: await this.hashPass(dto.password)
      })
    );

    return user;
  }

  async getById(search: string, withPass?: boolean): Promise<User> {
    var user: User = await this.repository.getById(search);

    if (user != null && !withPass)
      user.password = null;

    return user;
  }

  async getByEmail(search: string, completeObj?: boolean): Promise<User> {
    return this.repository.getByEmail(search, completeObj);
  }

  async getByCpf(search: string, completeObj?: boolean): Promise<User> {
    return this.repository.getByCpf(search, completeObj);
  }

  async getByUsernameAndPass(username: string, password: string): Promise<User> {
    var currUser: User = await this.getByCpf(username, true);
    if (currUser && currUser.password === await this.hashPass(password)) {
      return currUser;
    } else {
      return null;
    }
  }

  async changePassword(userId: string, dto: UpdatePasswordDto): Promise<User> {
    var user: User = await this.getById(userId);

    if (user && user.password === await this.hashPass(dto.old)) {
      user.password = await this.hashPass(dto.new);
      console.log(user);
      await this.repository.update(user);
    } else {
      throw new ServiceException({
        errorDef: ErrorsConst.invalidInput,
        description: "old password is incorrect"
      });
    }

    return user;
  }

  async changeEmail(userId: string, dto: UpdateEmailDto) {
    var userByNewEmail: User = await this.getByEmail(dto.new);

    if (userByNewEmail && userByNewEmail.id != userId) {
      throw new ServiceException({
        errorDef: ErrorsConst.alreadyExists,
        description: "e-mail is already registered"
      });
    }

    var user: User = await this.getById(userId);
    user.email = dto.new;
    //
    //
    this.repository.update(user);
    return user;
  }
}
