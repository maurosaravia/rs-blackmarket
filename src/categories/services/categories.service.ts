import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@categories/entities/category.entity';
import { CategoriesRepository } from '@categories/repositories/categories.repository';
import { EntityNotFoundError } from 'typeorm';
import { CategoryDTO } from '@categories/dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly categoriesRepo: CategoriesRepository,
  ) {}

  async findAll(): Promise<Category[]> {
    try {
      const categories = await this.categoriesRepo.find();
      return categories;
    } catch (exception) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      const category = await this.categoriesRepo.findById(id);
      return category;
    } catch (exception) {
      if (exception instanceof EntityNotFoundError)
        throw new NotFoundException();
      throw new InternalServerErrorException();
    }
  }

  async validateDTO(dto: CategoryDTO): Promise<void> {
    if (dto.parentCategoryId) {
      //Parent category id is not in the system
      let parent: Category;
      try {
        parent = await this.categoriesRepo.findById(dto.parentCategoryId);
      } catch (exception) {
        if (exception instanceof EntityNotFoundError)
          throw new BadRequestException('Parent category does not exist');
        throw new InternalServerErrorException();
      }

      //The new parent category is a subcategory and can't have children
      if (parent.parentCategoryId) {
        throw new BadRequestException("Parent category can't be a subcategory");
      }
    }
  }

  async create(dto: CategoryDTO): Promise<Category> {
    await this.validateDTO(dto);
    const category = this.categoriesRepo.create(dto);
    return this.categoriesRepo.save(category);
  }
}
