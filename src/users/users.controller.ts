import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') search: string) {
    return this.usersService.getById(search);
  }

  @Get('/email/:email')
  findByEmail(@Param('email') search: string) {
    return this.usersService.getByEmail(search);
  }

  @Get('/cpf/:cpf')
  findByCpf(@Param('cpf') search: string) {
    return this.usersService.getByCpf(search);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
