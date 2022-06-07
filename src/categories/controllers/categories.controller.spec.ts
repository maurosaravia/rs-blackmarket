import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '@categories/controllers/categories.controller';
import { CategoriesService } from '@categories/services/categories.service';

describe('CategoriesControllrer', () => {
  let controller: CategoriesController;
  const mockService = {
    create: jest.fn((dto) => {
      return { id: 2, ...dto, createdAt: new Date(), updatedAt: new Date() };
    }),
    isValid: jest.fn((dto) => {
      return dto != undefined ? '' : 'error';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    })
      .overrideProvider(CategoriesService)
      .useValue(mockService)
      .compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', async () => {
    const dto = { name: 'test', parentCategoryId: 1 };
    expect(await controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
