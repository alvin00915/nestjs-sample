import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(
    @Body('email') userEmail: string,
    @Body('name') userName: string,
    @Body('contactNo') userContactNo: string,
  ): any {
    this.usersService.create(userEmail, userName, userContactNo);
  }

  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    return user;
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body('email') userEmail: string,
    @Body('name') userName: string,
    @Body('contactNo') userContactNo: string,
  ) {
    return this.usersService.updateUser(id, userEmail, userName, userContactNo);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
