import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@users/services/users.service';
import { AuthService } from '@auth/services/auth.service';
import { mockSignupDTO } from '@auth/mocks/auth.mock';
import { mockService as mockUsersService } from '@users/mocks/users.mock';
import { Role } from '@users/entities/role.enum';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should signup a user when the dto is valid', () => {
      expect(service.signUp(mockSignupDTO)).resolves.toEqual({
        id: expect.any(Number),
        ...mockSignupDTO,
        role: Role.USER,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should not create a user when the user service throws an error', () => {
      mockUsersService.create.mockImplementationOnce(() => {
        throw new Error();
      });
      expect(service.signUp(mockSignupDTO)).rejects.toThrow(Error);
    });
  });
});
