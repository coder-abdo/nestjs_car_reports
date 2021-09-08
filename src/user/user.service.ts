import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(email: string, password: string) {
    const existingUser = await this.repo.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('user is already exist');
    }
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  async findOne(id: number) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('user is not found');
    }
    return user;
  }
  find(email: string) {
    return this.repo.find({ email });
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new BadRequestException('user not found');
    }
    return this.repo.remove(user);
  }
}
