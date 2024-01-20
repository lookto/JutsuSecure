import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignInDto, SignUpDto } from './user.dto';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(dto: SignUpDto): Promise<User> {
    const { jutsu, email, name } = dto;

    const user = new User();
    user.hashedJutsu = this.createHashedJutsu(jutsu);
    user.email = email;
    user.name = name;

    return user.save();
  }

  async signIn(dto: SignInDto): Promise<User> {
    const { jutsu, email } = dto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || user.hashedJutsu !== this.createHashedJutsu(jutsu)) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private createHashedJutsu(jutsu: string[]): string {
    const hash = crypto.createHash('sha256');
    hash.update(jutsu.join('_'));
    return hash.digest('base64');
  }
}
