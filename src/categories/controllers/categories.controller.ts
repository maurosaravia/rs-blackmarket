import {
  Body,
  Controller,
  Delete,
  Get,
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
    return this.categoriesService.findOne(id);
  }

  @Post()
  async create(@Body() createDTO: CategoryDTO) {
    return this.categoriesService.create(createDTO);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDTO: CategoryDTO) {
    return this.categoriesService.update(id, updateDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.categoriesService.delete(id);
  }
}
