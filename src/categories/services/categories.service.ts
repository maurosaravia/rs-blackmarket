import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@categories/entities/category.entity';
import { CategoriesRepository } from '@categories/repositories/categories.repository';
import { CategoryDTO } from '@categories/dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly categoriesRepo: CategoriesRepository,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepo.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepo.findOne(id);
    if (!category) throw new NotFoundException();
    return category;
  }

  async create(createCategoryDto: CategoryDTO): Promise<Category> {
    return this.categoriesRepo.createCategory(createCategoryDto);
  }
}
