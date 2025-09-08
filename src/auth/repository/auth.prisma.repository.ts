import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AuthContracts } from './auth.contract';
import { logInDto, signInDto } from 'src/auth/dto/auth.dto';
import { encryptPassword, comparePassword } from './crypt';
import { Prisma } from 'generated/prisma';

@Injectable()
export class AuthPrismaRepository implements AuthContracts {
  constructor(private prisma: PrismaService) {}
  async logIn(user: logInDto): Promise<object> {
    const response = await this.prisma.tb_user.findUniqueOrThrow({
      where: { email: user.email },
    });
    const isPasswordValid = await comparePassword(
      user.password,
      response.password,
    );
    if (!isPasswordValid) {
      throw new Prisma.PrismaClientValidationError('Invalid Password', {
        clientVersion: '6.15.0',
      });
    }
    delete (response as any).password;
    return response;
  }
  async signIn(user: signInDto): Promise<void> {
    const password = await encryptPassword(user.password);
    await this.prisma.tb_user.create({
      data: {
        email: user.email,
        name: user.name,
        lastname: user.lastName,
        password: password,
        icon: user.icon,
        providerid: user.provider,
      },
    });
  }
}
