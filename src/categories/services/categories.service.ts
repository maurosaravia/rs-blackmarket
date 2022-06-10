import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '@categories/entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
  ) {}

  async exists(id: number): Promise<boolean> {
    return (await this.categoriesRepo.count({ id: id })) > 0;
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepo.find();
  }

  async findOne(id: number): Promise<Category> {
    if (!(await this.exists(id))) {
      throw new NotFoundException();
    }
    return this.categoriesRepo.findOne(id);
  }
}
