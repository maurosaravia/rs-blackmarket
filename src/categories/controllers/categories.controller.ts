import { Controller, Get, Param } from '@nestjs/common';
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
}
