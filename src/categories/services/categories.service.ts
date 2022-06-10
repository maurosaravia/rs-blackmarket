import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDTO } from '@categories/dtos/category.dto';
import { Category } from '@categories/entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
  ) {}

  async exists(id: number): Promise<boolean> {
    return (await this.categoriesRepo.count({ id: id })) > 0;
  }

  async isValid(dto: CategoryDTO, category: Category = null): Promise<string> {
    if (dto.parentCategoryId) {
      //Parent category id is not in the system
      if (!(await this.exists(dto.parentCategoryId))) {
        return 'Parent category does not exist';
      }
      const parent = await this.findOne(dto.parentCategoryId);

      //The new parent category is a subcategory and can't have children
      if (parent && parent.parentCategoryId != undefined) {
        return "Parent category can't be a subcategory";
      }

      //Current category has children and can't become a subcategory
      if (
        category &&
        category.childCategories &&
        category.childCategories.length > 0
      ) {
        return "Category with children can't be a subcategory";
      }
    }
    return '';
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

  async create(dto: CategoryDTO): Promise<Category> {
    const error = await this.isValid(dto);
    if (error) {
      throw new BadRequestException(error);
    }
    const category = this.categoriesRepo.create(dto);
    return this.categoriesRepo.save(category);
  }

  async update(id: number, dto: CategoryDTO): Promise<Category> {
    const category = await this.categoriesRepo.findOne(id);
    const error = await this.isValid(dto, category);
    if (error) {
      throw new BadRequestException(error);
    }
    this.categoriesRepo.merge(category, dto);
    return this.categoriesRepo.save(category);
  }

  async delete(id: number): Promise<void> {
    if (!(await this.exists(id))) {
      throw new NotFoundException();
    }
    await this.categoriesRepo.delete(id);
  }
}
