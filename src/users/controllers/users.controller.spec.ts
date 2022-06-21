import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '@users/controllers/users.controller';
import { mockAdmin, mockService, mockUsers } from '@users/mocks/users.mock';
import { UsersService } from '@users/services/users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all categories', () => {
    expect(controller.getAll()).resolves.toEqual(mockUsers);
  });

  it('should get one category', () => {
    const id = 1;
    expect(controller.getOne(id)).resolves.toEqual({
      id,
      ...mockAdmin,
    });
  });
});
