import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '@categories/services/categories.service';
import { CategoryDTO } from '@categories/dtos/category.dto';
import { Category } from '@categories/entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { CategoriesRepository } from '@categories/repositories/categories.repository';

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
  let mockCategories = [
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
    findById: jest.fn((id) => {
      if (!mockCategories) throw 'unexpected';
      if (!mockCategories[id]) throw new EntityNotFoundError(Category, 'test');
      return mockCategories[id];
    }),
    find: jest.fn(() => {
      if (!mockCategories) throw 'unexpected';
      return mockCategories;
    }),
    create: jest.fn((dto) => {
      return { ...dto };
    }),
    save: jest.fn((dto) => {
      return { id: 1, ...mockCategory, ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(CategoriesRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all categories', () => {
    expect(service.findAll()).resolves.toBe(mockCategories);
  });

  it('should not get all categories, unexpected error in repository', () => {
    const correctMockCategories = mockCategories;
    mockCategories = null;
    expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
    mockCategories = correctMockCategories;
  });

  it('should get one category', () => {
    expect(service.findOne(1)).resolves.toEqual(mockParentCategory);
  });

  it('should not get a category, id not found', () => {
    expect(service.findOne(100)).rejects.toThrow(NotFoundException);
  });

  it('should not get a category, unexpected error in repository', () => {
    const correctMockCategories = mockCategories;
    mockCategories = null;
    expect(service.findOne(100)).rejects.toThrow(InternalServerErrorException);
    mockCategories = correctMockCategories;
  });

  it('should create a category', () => {
    expect(service.create(mockDTO)).resolves.toEqual({
      id: expect.any(Number),
      ...mockDTO,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should create a child category', () => {
    expect(service.create(mockChildDTO)).resolves.toEqual({
      id: expect.any(Number),
      ...mockChildDTO,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should not create a category, parentCategory doesn't exist", () => {
    expect(
      service.create({ ...mockDTO, parentCategoryId: 100 }),
    ).rejects.toThrow(BadRequestException);
  });

  it("should not create a category, parentCategory can't be a subcategory", () => {
    expect(service.create({ ...mockDTO, parentCategoryId: 2 })).rejects.toThrow(
      BadRequestException,
    );
  });
});
