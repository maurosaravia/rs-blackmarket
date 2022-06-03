import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryDTO } from '@categories/dtos/category.dto';
import { CategoriesService } from '@categories/services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getall() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    if (!(await this.categoriesService.exists(id))) {
      throw new NotFoundException();
    }
    return this.categoriesService.findOne(id);
  }

  @Post()
  async create(@Body() createDTO: CategoryDTO) {
    const error = await this.categoriesService.isValid(createDTO);
    if (error) {
      throw new BadRequestException(error);
    }
    return this.categoriesService.create(createDTO);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDTO: CategoryDTO) {
    if (!(await this.categoriesService.exists(id))) {
      throw new NotFoundException();
    }
    const error = await this.categoriesService.isValid(updateDTO);
    if (error) {
      throw new BadRequestException(error);
    }
    return this.categoriesService.update(id, updateDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    if (!(await this.categoriesService.exists(id))) {
      throw new NotFoundException();
    }
    return this.categoriesService.delete(id);
  }
}
