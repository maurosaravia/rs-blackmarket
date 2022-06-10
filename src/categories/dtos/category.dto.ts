import { IsNumber, MaxLength } from 'class-validator';

export class CategoryDTO {
  @MaxLength(50)
  name: string;

  @IsNumber()
  parentCategoryId?: number;
}
