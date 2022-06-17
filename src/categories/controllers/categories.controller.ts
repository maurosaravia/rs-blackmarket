import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from '@categories/services/categories.service';
import { Category } from '@categories/entities/category.entity';

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
}
