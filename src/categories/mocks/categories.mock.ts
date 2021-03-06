import { Category } from '@categories/entities/category.entity';
import { CategoryDTO } from '@categories/dtos/category.dto';

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
  delete: jest.fn(),
  update: jest.fn((id, dto) => {
    return { id, ...mockCategory, ...dto };
  }),
};

const mockRepository = {
  findOne: jest.fn((id) => {
    return mockCategories[id];
  }),
  find: jest.fn(() => {
    return mockCategories;
  }),
  createCategory: jest.fn((dto) => {
    return { id: 1, ...mockCategory, ...dto };
  }),
  softDelete: jest.fn(),
  save: jest.fn((category) => {
    return { id: 1, ...category };
  }),
  merge: jest.fn((category, dto) => {
    category.name = dto.name;
  }),
};

export {
  mockCategory,
  mockParentCategory,
  mockChildCategory,
  mockParentCategory2,
  mockChildCategory2,
  mockCategories,
  mockDTO,
  mockChildDTO,
  mockParentDTO,
  mockService,
  mockRepository,
};
