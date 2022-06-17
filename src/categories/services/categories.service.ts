import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@categories/entities/category.entity';
import { CategoriesRepository } from '@categories/repositories/categories.repository';
import { EntityNotFoundError } from 'typeorm';

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
}
