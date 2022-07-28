import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@auth/controllers/auth.controller';
import { mockSignupDTO, mockService } from '@auth/mocks/auth.mock';
import { AuthService } from '@auth/services/auth.service';
import { Role } from '@users/entities/role.enum';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should signup a user', () => {
    expect(controller.signup(mockSignupDTO)).resolves.toEqual({
      id: expect.any(Number),
      ...mockSignupDTO,
      role: Role.USER,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
