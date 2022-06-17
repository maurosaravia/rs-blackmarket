import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '@categories/controllers/categories.controller';
import { CategoriesService } from '@categories/services/categories.service';
import {
  mockCategories,
  mockCategory,
  mockService,
} from '@categories/mocks/categories.mock';

describe('CategoriesController', () => {
  let controller: CategoriesController;

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
});
