import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDTO } from '@categories/dtos/category.dto';
import { Category } from '@categories/entities/category.entity';

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

  async delete(id: number): Promise<void> {
    await this.categoriesRepo.delete(id);
  }

  async exists(id: number): Promise<boolean> {
    return (await this.categoriesRepo.count({ id: id })) > 0;
  }

  async isValid(dto: CategoryDTO): Promise<string> {
    if (dto.parentCategoryId && !(await this.exists(dto.parentCategoryId))) {
      return 'Parent category does not exist';
    }
    const parent = await this.findOne(dto.parentCategoryId);
    if (parent && parent.parentCategoryId != undefined) {
      return "Parent category can't be a subcategory";
    }
    return '';
  }
}
