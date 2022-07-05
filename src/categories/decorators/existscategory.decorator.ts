import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getCustomRepository } from 'typeorm';
import { CategoriesRepository } from '@categories/repositories/categories.repository';

@ValidatorConstraint({ async: true })
export class ExistsCategoryConstraint implements ValidatorConstraintInterface {
  validate(categoryId: any, args: ValidationArguments) {
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    return categoriesRepository.findOne(categoryId).then((category) => {
      return category !== undefined;
    });
  }
}

export function ExistsCategory(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistsCategoryConstraint,
    });
  };
}
