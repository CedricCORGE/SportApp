import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.pseudo = createUserDto.pseudo;
    user.email = createUserDto.email;
    const salt = await genSalt();
    const encryptedPassword = await hash(createUserDto.password, salt);
    user.password = encryptedPassword;
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = new User();
    user.pseudo = updateUserDto.pseudo;
    user.email = updateUserDto.email;
    const salt = await genSalt();
    const encryptedPassword = await hash(updateUserDto.password, salt);
    user.password = encryptedPassword;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
