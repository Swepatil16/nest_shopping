import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, Column } from 'typeorm';
import { Products } from '../products/products.entity';
import { Users } from '../users/users.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Products)
  @JoinTable()
  products: Products[];

  @ManyToOne(() => Users)
  user: Users;

  @Column({ type: 'float', nullable: true })
  totalPrice: number;

}
