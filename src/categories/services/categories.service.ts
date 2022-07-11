import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@categories/entities/category.entity';
import { CategoriesRepository } from '@categories/repositories/categories.repository';
import { CategoryDTO } from '@categories/dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly categoriesRepo: CategoriesRepository,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepo.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepo.findOne(id, {
      relations: ['childCategories'],
    });
    if (!category) throw new NotFoundException();
    return category;
  }

  async create(createCategoryDto: CategoryDTO): Promise<Category> {
    return this.categoriesRepo.createCategory(createCategoryDto);
  }

  async delete(id: number): Promise<void> {
    //check if exists
    const category = await this.findOne(id);
    if (category.childCategories) {
      category.childCategories.forEach((c) => {
        c.parentCategoryId = null;
        this.categoriesRepo.save(c);
      });
    }
    await this.categoriesRepo.softDelete(id);
  }

  async update(id: number, dto: CategoryDTO): Promise<Category> {
    const category = await this.findOne(id);
    if (dto.parentCategoryId == id)
      throw new BadRequestException("Category can't be its own parent");
    if (
      dto.parentCategoryId &&
      category.childCategories &&
      category.childCategories.length > 0
    )
      throw new BadRequestException(
        "Category with children can't be a subcategory",
      );
    this.categoriesRepo.merge(category, dto);
    return this.categoriesRepo.save(category);
  }
}
