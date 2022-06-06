import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from '@users/dtos/user.dto';
import { UsersService } from '@users/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getall() {
    return this.usersService.listUsers();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    if (!(await this.usersService.exists(id))) {
      throw new NotFoundException();
    }
    return this.usersService.showUser(id);
  }

  @Post()
  create(@Body() dto: UserDTO) {
    return this.usersService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UserDTO) {
    if (!(await this.usersService.exists(id))) {
      throw new NotFoundException();
    }
    return this.usersService.editUser(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    if (!(await this.usersService.exists(id))) {
      throw new NotFoundException();
    }
    return this.usersService.deleteUser(id);
  }
}
