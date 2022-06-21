import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '@categories/services/categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesRepository } from '@categories/repositories/categories.repository';
import {
  mockCategories,
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

  it('should get all categories', () => {
    expect(service.findAll()).resolves.toBe(mockCategories);
  });

  it('should not get all categories, unexpected error in repository', () => {
    mockRepository.find.mockImplementationOnce(() => {
      throw 'unexpected';
    });
    expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
  });

  it('should get one category', () => {
    expect(service.findOne(1)).resolves.toEqual(mockParentCategory);
  });

  it('should not get a category, id not found', () => {
    expect(service.findOne(100)).rejects.toThrow(NotFoundException);
  });

  it('should not get a category, unexpected error in repository', () => {
    mockRepository.findById.mockImplementationOnce(() => {
      throw 'unexpected';
    });
    expect(service.findOne(100)).rejects.toThrow(InternalServerErrorException);
  });

  it('should delete a category', async () => {
    const id = 1;
    await service.delete(id);
    expect(mockRepository.softDelete).toHaveBeenCalledTimes(1);
    expect(mockRepository.softDelete).toHaveBeenCalledWith(id);
  });

  it('should delete a category and modify its children', async () => {
    const id = 1;
    const category = await service.findOne(id);
    const children = category.childCategories;
    await service.delete(id);
    for (let i = 0; i < children.length; i++)
      expect(children[i].parentCategoryId).toBeNull();
  });

  it('should not delete a category, id not found', () => {
    expect(service.delete(100)).rejects.toThrow(NotFoundException);
  });

  it('should not delete a category, unexpected error in repository', () => {
    mockRepository.softDelete.mockImplementationOnce(() => {
      throw 'unexpected';
    });
    expect(service.delete(1)).rejects.toThrow(InternalServerErrorException);
  });
});
