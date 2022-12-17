import { Controller, Get, Put, Post, Body, Request, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  get(@Request() req) {
    return this.usersService.getById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/password')
  changePassword(@Request() req, @Body() dto: UpdatePasswordDto) {
    return this.usersService.changePassword(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/email')
  changeEmail(@Request() req, @Body() dto: UpdateEmailDto) {
    return this.usersService.changeEmail(req.user.id, dto);
  }
}
