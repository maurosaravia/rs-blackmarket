import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockAdmin,
  mockAdminDTO,
  mockRepository,
  mockUsers,
} from '@users/mocks/users.mock';
import { UsersRepository } from '@users/repositories/users.repository';
import { UsersService } from '@users/services/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all users when the repository works correctly', () => {
      expect(service.findAll()).resolves.toBe(mockUsers);
    });

    it('should not get all users when the repository throws an error', () => {
      mockRepository.find.mockImplementationOnce(() => {
        throw new Error();
      });
      expect(service.findAll()).rejects.toThrow(Error);
    });
  });

  describe('findOne', () => {
    it('should get one user when the id exists', () => {
      expect(service.findOne(1)).resolves.toEqual(mockAdmin);
    });

    it('should not get a user when the id is not found', () => {
      expect(service.findOne(100)).rejects.toThrow(NotFoundException);
    });

    it('should not get a user when the repository throws an error', () => {
      mockRepository.findById.mockImplementationOnce(() => {
        throw new Error();
      });
      expect(service.findOne(100)).rejects.toThrow(Error);
    });
  });

  describe('create', () => {
    it('should create a user when the dto is valid', () => {
      expect(service.create(mockAdminDTO)).resolves.toEqual({
        id: expect.any(Number),
        ...mockAdminDTO,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should not create a user when the repository throws an error', () => {
      mockRepository.createUser.mockImplementationOnce(() => {
        throw new Error();
      });
      expect(service.create({ ...mockAdminDTO })).rejects.toThrow(Error);
    });
  });
});
