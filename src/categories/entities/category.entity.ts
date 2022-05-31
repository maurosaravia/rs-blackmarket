import { Base } from 'src/entities/base.entity';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'categories' })
export class Category extends Base {
  @Column({ default: '' })
  name!: string;

  @Column({ nullable: true })
  parentCategoryId?: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'parent_category_id' })
  parentCategory?: Category;
}
