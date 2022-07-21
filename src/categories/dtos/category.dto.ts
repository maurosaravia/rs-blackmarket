import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ExistsCategory } from '@categories/decorators/existscategory.decorator';
import { IsNotSubcategory } from '@categories/decorators/isnotsubcategory.decorator';

export class CategoryDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsNumber()
  @ExistsCategory({ message: 'Parent category does not exist' })
  @IsNotSubcategory({ message: "Parent category can't be a subcategory" })
  parentCategoryId?: number;
}
