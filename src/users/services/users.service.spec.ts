import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockAdmin, mockRepository, mockUsers } from '@users/mocks/users.mock';
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

  it('should get all users', () => {
    expect(service.findAll()).resolves.toBe(mockUsers);
  });

  it('should not get all users, unexpected error in repository', () => {
    mockRepository.find.mockImplementationOnce(() => {
      throw 'unexpected';
    });
    expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
  });

  it('should get one user', () => {
    expect(service.findOne(1)).resolves.toEqual(mockAdmin);
  });

  it('should not get a user, id not found', () => {
    expect(service.findOne(100)).rejects.toThrow(NotFoundException);
  });

  it('should not get a user, unexpected error in repository', () => {
    mockRepository.findById.mockImplementationOnce(() => {
      throw 'unexpected';
    });
    expect(service.findOne(100)).rejects.toThrow(InternalServerErrorException);
  });
});
