import { IsNumber, IsString } from 'class-validator';

export class CategoryDTO {
  @IsString()
  name: string;

  @IsNumber()
  parentCategoryId?: number;
}
