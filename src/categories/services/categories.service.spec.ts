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
        throw new Error();
      });
      expect(service.findAll()).rejects.toThrow(Error);
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
      mockRepository.findOne.mockImplementationOnce(() => {
        throw new Error();
      });
      expect(service.findOne(100)).rejects.toThrow(Error);
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

    it('should not create a category when the repository throws an error', () => {
      mockRepository.createCategory.mockImplementationOnce(() => {
        throw new Error();
      });
      expect(service.create({ ...mockDTO })).rejects.toThrow(Error);
    });
  });

  describe('delete', () => {
    it('should delete a category when the id exists', async () => {
      const id = 1;
      await service.delete(id);
      expect(mockRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(mockRepository.softDelete).toHaveBeenCalledWith(id);
    });

    it('should delete a category and modify its children when it has children', async () => {
      const id = 1;
      const category = await service.findOne(id);
      const children = category.childCategories;
      await service.delete(id);
      for (let i = 0; i < children.length; i++)
        expect(children[i].parentCategoryId).toBeNull();
    });

    it('should not delete a category when the id is not found', () => {
      expect(service.delete(100)).rejects.toThrow(NotFoundException);
    });

    it('should not delete a category when the repository throws an error', () => {
      mockRepository.softDelete.mockImplementationOnce(() => {
        throw new Error();
      });
      expect(service.delete(1)).rejects.toThrow(Error);
    });
  });
});
