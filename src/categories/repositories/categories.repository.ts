import { EntityRepository, Repository } from 'typeorm';
import { Category } from '@categories/entities/category.entity';
import { CategoryDTO } from '@categories/dtos/category.dto';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  createCategory(createCategoryDto: CategoryDTO): Promise<Category> {
    const category = this.create(createCategoryDto);
    return this.save(category);
  }
}
