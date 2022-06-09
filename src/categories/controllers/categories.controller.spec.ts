import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '@categories/controllers/categories.controller';
import { CategoriesService } from '@categories/services/categories.service';
import { CategoryDTO } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';

describe('CategoriesControllrer', () => {
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
    create: jest.fn((dto) => {
      return { id: 1, ...mockCategory, ...dto };
    }),
    update: jest.fn((id, dto) => {
      return { id, ...mockCategory, ...dto };
    }),
    delete: jest.fn(),
    findAll: jest.fn(() => {
      return mockCategories;
    }),
    findOne: jest.fn((id) => {
      return { id, ...mockCategory };
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

  it('should create a category', async () => {
    expect(await controller.create(mockDTO)).toEqual({
      id: expect.any(Number),
      ...mockDTO,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should update a category', async () => {
    const id = 1;
    expect(await controller.update(id, mockDTO)).toEqual({
      id,
      ...mockDTO,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should delete a category', async () => {
    const id = 1;
    await controller.delete(id);
    expect(mockService.delete).toHaveBeenCalledTimes(1);
    expect(mockService.delete).toHaveBeenCalledWith(id);
  });

  it('should get all categories', async () => {
    expect(await controller.getall()).toEqual(mockCategories);
  });

  it('should get one category', async () => {
    const id = 1;
    expect(await controller.getOne(id)).toEqual({
      id,
      ...mockCategory,
    });
  });
});
