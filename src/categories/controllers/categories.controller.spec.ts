import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '@categories/controllers/categories.controller';
import { CategoriesService } from '@categories/services/categories.service';

describe('CategoriesControllrer', () => {
  let controller: CategoriesController;
  const mockService = {
    create: jest.fn((dto) => {
      return { id: 2, ...dto, createdAt: new Date(), updatedAt: new Date() };
    }),
    update: jest.fn((id, dto) => {
      return { id, ...dto, createdAt: new Date(), updatedAt: new Date() };
    }),
    isValid: jest.fn((dto) => {
      return dto != undefined ? '' : 'error';
    }),
    exists: jest.fn((id) => {
      return id === 1;
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    delete: jest.fn((_id) => {}),
    findAll: jest.fn(() => {
      return [
        {
          id: 1,
          name: 'test',
          parentCategoryId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
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

  it('should update a category', async () => {
    const id = 1;
    const dto = { name: 'test', parentCategoryId: null };
    expect(await controller.update(id, dto)).toEqual({
      id,
      ...dto,
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
    expect(await controller.getall()).toEqual([
      {
        id: 1,
        name: 'test',
        parentCategoryId: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);
  });
});
