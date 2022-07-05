import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CategoriesService } from '@categories/services/categories.service';
import { Category } from '@categories/entities/category.entity';
import { CategoryDTO } from '@categories/dtos/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Post()
  async create(@Body() createCategoryDto: CategoryDTO): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }
}
