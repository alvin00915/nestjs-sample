import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(email: string, name: string, contactNo: string) {
    const newUser = new this.userModel({ email, name, contactNo });
    const result = await newUser.save();
    return result.id;
  }

  async getUsers() {
    const users = await this.userModel.find();
    return users;
  }

  async findUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('No user found');
    }
    return user;
  }

  async getUser(id) {
    const user = this.findUser(id);
    return user;
  }

  async updateUser(id: string, email: string, name: string, contactNo: string) {
    const updatedUser = await this.findUser(id);
    if (email) {
      updatedUser.email = email;
    }

    if (name) {
      updatedUser.name = name;
    }

    if (contactNo) {
      updatedUser.contactNo = contactNo;
    }

    await updatedUser.save();
  }

  async deleteUser(id) {
    const deleteUser = await this.findUser(id);
    if (!deleteUser) throw new NotFoundException('No user found');
    await deleteUser.delete();
  }
}
