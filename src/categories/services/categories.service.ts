import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '@categories/entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
  ) {}

  async exists(id: number): Promise<boolean> {
    try {
      return (await this.categoriesRepo.count({ id: id })) > 0;
    } catch (exception) {
      throw new InternalServerErrorException();
    }
  }

  findAll(): Promise<Category[]> {
    try {
      return this.categoriesRepo.find();
    } catch (exception) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number): Promise<Category> {
    if (!(await this.exists(id))) {
      throw new NotFoundException();
    }
    try {
      return this.categoriesRepo.findOne(id);
    } catch (exception) {
      throw new InternalServerErrorException();
    }
  }
}
