import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '@categories/controllers/categories.controller';
import { CategoriesService } from '@categories/services/categories.service';
import { CategoryDTO } from '@categories/dtos/category.dto';
import { Category } from '@categories/entities/category.entity';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  const mockCategory = new Category();
  mockCategory.name = 'test';
  mockCategory.parentCategoryId = null;
  mockCategory.createdAt = new Date();
  mockCategory.updatedAt = new Date();

  const mockCategories = [
    mockCategory,
    { ...mockCategory, name: 'test 2' },
    { ...mockCategory, name: 'test 3' },
  ];

  const mockDTO = new CategoryDTO();
  mockDTO.name = mockCategory.name;
  mockDTO.parentCategoryId = mockCategory.parentCategoryId;

  const mockService = {
    findAll: jest.fn(() => {
      return mockCategories;
    }),
    findOne: jest.fn((id) => {
      return { id, ...mockCategory };
    }),
    create: jest.fn((dto) => {
      return { id: 1, ...mockCategory, ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [{ provide: CategoriesService, useValue: mockService }],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all categories', () => {
    expect(controller.getAll()).resolves.toEqual(mockCategories);
  });

  it('should get one category', () => {
    const id = 1;
    expect(controller.getOne(id)).resolves.toEqual({
      id,
      ...mockCategory,
    });
  });

  it('should create a category', async () => {
    expect(controller.create(mockDTO)).resolves.toEqual({
      id: expect.any(Number),
      ...mockDTO,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
