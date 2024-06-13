import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
      ) {}    
      
      async createUser(createUserDto: CreateUserDto): Promise<Users> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
      }
    
      async findAll(): Promise<Users[]> {
        return this.usersRepository.find();
      }
    
      async findOne(id: number): Promise<Users> {
        return this.usersRepository.findOneBy({ id });
      }
    
      async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
        await this.usersRepository.update(id, updateUserDto);
        return this.usersRepository.findOneBy({ id });
      }
    
      async removeUser(id: number): Promise<void> {
        await this.usersRepository.delete(id);
      }
}
