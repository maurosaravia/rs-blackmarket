import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryDTO } from '../dtos/category.dto';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getall() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() createDTO: CategoryDTO) {
    return this.categoriesService.create(createDTO);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDTO: CategoryDTO) {
    return this.categoriesService.update(id, updateDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoriesService.delete(id);
  }
}
