import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '@categories/services/categories.service';
import { CategoryDTO } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
    create: jest.fn((dto) => {
      return { ...dto };
    }),
    save: jest.fn((dto) => {
      return { id: 1, ...mockCategory, ...dto };
    }),
    findOne: jest.fn((id) => {
      return mockCategories[id];
    }),
    count: jest.fn((conditions) => {
      return mockCategories.filter((category) => category.id == conditions.id)
        .length;
    }),
    merge: jest.fn((category, dto) => {
      category.name = dto.name;
    }),
    delete: jest.fn(),
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

  it('should create a category', () => {
    expect(service.create(mockDTO)).resolves.toEqual({
      id: expect.any(Number),
      ...mockDTO,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should create a child category', async () => {
    expect(service.create(mockChildDTO)).resolves.toEqual({
      id: expect.any(Number),
      ...mockChildDTO,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should not create a category, parentCategory doesn't exist", async () => {
    expect(
      service.create({ ...mockDTO, parentCategoryId: 100 }),
    ).rejects.toThrow(BadRequestException);
  });

  it("should not create a category, parentCategory can't be a subcategory", async () => {
    expect(service.create({ ...mockDTO, parentCategoryId: 2 })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should update a category', () => {
    const id = 1;
    expect(
      service.update(id, { ...mockParentDTO, name: 'updated' }),
    ).resolves.toEqual({
      id,
      ...mockParentDTO,
      name: 'updated',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      childCategories: expect.any(Array),
    });
  });

  it("should not update a category, parentCategory doesn't exist", () => {
    const id = 1;
    expect(
      service.update(id, { ...mockParentDTO, parentCategoryId: 100 }),
    ).rejects.toThrow(BadRequestException);
  });

  it("should not update a category, parentCategory can't be a subcategory", () => {
    const id = 2;
    expect(
      service.update(id, { ...mockDTO, parentCategoryId: 4 }),
    ).rejects.toThrow(BadRequestException);
  });

  it("should not update a category, category with children can't be a subcategory", async () => {
    const id = 1;
    expect(
      service.update(id, { ...mockDTO, parentCategoryId: 3 }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should delete a category', async () => {
    const id = 1;
    await service.delete(id);
    expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should not delete a category, id not found', () => {
    expect(service.delete(100)).rejects.toThrow(NotFoundException);
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
