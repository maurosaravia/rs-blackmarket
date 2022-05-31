import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDTO } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepo.find();
  }

  findOne(id: number): Promise<Category> {
    return this.categoriesRepo.findOne(id);
  }

  create(dto: CategoryDTO): Promise<Category> {
    const category = this.categoriesRepo.create(dto);
    return this.categoriesRepo.save(category);
  }

  async update(id: number, dto: CategoryDTO): Promise<Category> {
    const category = await this.categoriesRepo.findOne(id);
    this.categoriesRepo.merge(category, dto);
    return this.categoriesRepo.save(category);
  }

  async delete(id: number): Promise<boolean> {
    await this.categoriesRepo.delete(id);
    return true;
  }
}
