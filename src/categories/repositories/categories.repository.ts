import { EntityRepository, Repository } from 'typeorm';
import { Category } from '@categories/entities/category.entity';
import { CategoryDTO } from '@categories/dtos/category.dto';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  async findById(id: number): Promise<Category> {
    return this.findOneOrFail(id);
  }

  async createFromDto(dto: CategoryDTO): Promise<Category> {
    const category = this.create(dto);
    return this.save(category);
  }
}
