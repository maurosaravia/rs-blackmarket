import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '@categories/services/categories.service';
import { CategoryDTO } from '@categories/dtos/category.dto';
import { Category } from '@categories/entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CategoriesService', () => {
  let service: CategoriesService;

  const mockCategory = new Category();
  mockCategory.name = 'test';
  mockCategory.parentCategoryId = null;
  mockCategory.createdAt = new Date();
  mockCategory.updatedAt = new Date();

  const mockParentCategory = new Category();
  mockParentCategory.id = 1;
  mockParentCategory.name = 'parent';
  mockParentCategory.parentCategoryId = null;
  mockParentCategory.createdAt = new Date();
  mockParentCategory.updatedAt = new Date();

  const mockChildCategory = new Category();
  mockChildCategory.id = 2;
  mockChildCategory.name = 'child';
  mockChildCategory.parentCategoryId = 1;
  mockChildCategory.createdAt = new Date();
  mockChildCategory.updatedAt = new Date();
  mockParentCategory.childCategories = [mockChildCategory];

  const mockParentCategory2 = new Category();
  mockParentCategory2.id = 3;
  mockParentCategory2.name = 'parent 2';
  mockParentCategory2.parentCategoryId = null;
  mockParentCategory2.createdAt = new Date();
  mockParentCategory2.updatedAt = new Date();

  const mockChildCategory2 = new Category();
  mockChildCategory2.id = 4;
  mockChildCategory2.name = 'child 2';
  mockChildCategory2.parentCategoryId = 3;
  mockChildCategory2.createdAt = new Date();
  mockChildCategory2.updatedAt = new Date();
  mockParentCategory2.childCategories = [mockChildCategory2];

  const mockCategories = [
    mockCategory,
    mockParentCategory,
    mockChildCategory,
    mockParentCategory2,
    mockChildCategory2,
  ];

  const mockDTO = new CategoryDTO();
  mockDTO.name = mockCategory.name;
  mockDTO.parentCategoryId = mockCategory.parentCategoryId;

  const mockParentDTO = new CategoryDTO();
  mockParentDTO.name = mockParentCategory.name;
  mockParentDTO.parentCategoryId = mockParentCategory.parentCategoryId;

  const mockChildDTO = new CategoryDTO();
  mockChildDTO.name = mockChildCategory.name;
  mockChildDTO.parentCategoryId = mockChildCategory.parentCategoryId;

  const mockRepository = {
    findOne: jest.fn((id) => {
      return mockCategories[id];
    }),
    count: jest.fn((conditions) => {
      return mockCategories.filter((category) => category.id == conditions.id)
        .length;
    }),
    find: jest.fn(() => {
      return mockCategories;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: getRepositoryToken(Category), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all categories', () => {
    expect(service.findAll()).toBe(mockCategories);
  });

  it('should get one category', () => {
    expect(service.findOne(1)).resolves.toEqual(mockParentCategory);
  });

  it('should not get a category, id not found', () => {
    expect(service.findOne(100)).rejects.toThrow(NotFoundException);
  });
});
