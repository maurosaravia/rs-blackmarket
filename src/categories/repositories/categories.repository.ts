import { EntityRepository, Repository } from 'typeorm';
import { Category } from '@categories/entities/category.entity';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  async findById(id: number): Promise<Category> {
    return this.findOneOrFail(id, { relations: ['childCategories'] });
  }
}
