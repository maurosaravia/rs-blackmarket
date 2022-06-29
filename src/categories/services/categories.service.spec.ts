import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '@categories/services/categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesRepository } from '@categories/repositories/categories.repository';
import {
  mockCategories,
  mockChildDTO,
  mockDTO,
  mockParentCategory,
  mockRepository,
} from '@categories/mocks/categories.mock';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(CategoriesRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findall', () => {
    it('should get all categories when the repository works correctly', () => {
      expect(service.findAll()).resolves.toBe(mockCategories);
    });

    it('should fail when the repository throws an error', () => {
      mockRepository.find.mockImplementationOnce(() => {
        throw 'unexpected';
      });
      expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findOne', () => {
    it('should get one category when the id exists', () => {
      expect(service.findOne(1)).resolves.toEqual(mockParentCategory);
    });

    it('should not get a category when the id is not found', () => {
      expect(service.findOne(100)).rejects.toThrow(NotFoundException);
    });

    it('should not get a category when the repository throws an error', () => {
      mockRepository.findById.mockImplementationOnce(() => {
        throw 'unexpected';
      });
      expect(service.findOne(100)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('create', () => {
    it('should create a category when the dto is valid', () => {
      expect(service.create(mockDTO)).resolves.toEqual({
        id: expect.any(Number),
        ...mockDTO,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should create a child category when the dto is valid', () => {
      expect(service.create(mockChildDTO)).resolves.toEqual({
        id: expect.any(Number),
        ...mockChildDTO,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should not create a category when the parent category doesn't exist", () => {
      expect(
        service.create({ ...mockDTO, parentCategoryId: 100 }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should not create a category when the parent category is a subcategory', () => {
      expect(
        service.create({ ...mockDTO, parentCategoryId: 2 }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should not create a category when the repository throws an error', () => {
      mockRepository.createCategory.mockImplementationOnce(() => {
        throw 'unexpected';
      });
      expect(service.create({ ...mockDTO })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});