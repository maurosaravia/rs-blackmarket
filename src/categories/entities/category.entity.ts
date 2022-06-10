import { Base } from 'src/entities/base.entity';
import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class Category extends Base {
  @Column('character varying', { length: 50 })
  name!: string;

  @Column({ name: 'parent_category_id', nullable: true })
  parentCategoryId?: number;

  @ManyToOne(() => Category, (category) => category.childCategories)
  @JoinColumn({ name: 'parent_category_id' })
  parentCategory?: Category;

  @OneToMany(() => Category, (category) => category.parentCategory)
  childCategories: Category[];
}
