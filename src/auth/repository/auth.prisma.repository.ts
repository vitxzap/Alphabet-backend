import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AuthContracts } from './auth.contract';
import { logInDto, signInDto } from 'src/auth/dto/auth.dto';
import { encryptPassword, comparePassword } from './crypt';
@Injectable()
export class AuthPrismaRepository implements AuthContracts {
  constructor(private prisma: PrismaService) {}
  async logIn(user: logInDto): Promise<object> {
    const response = await this.prisma.tb_user.findUniqueOrThrow({ //Gets the user by email
      where: { email: user.email },
    });
    const isPasswordValid = await comparePassword( //Comparing passwords
      user.password,
      response.password,
    );
    if (!isPasswordValid) { // Verify if the password is valid and throws an error if its not
      throw new BadRequestException("Incorrect password.") 
    }
    delete (response as any).password; // Remove the field password from the response object
    return response;
  }
  async signIn(user: signInDto): Promise<void> {
    const password = await encryptPassword(user.password); //Encrypt the password
    await this.prisma.tb_user.create({ //Create the user using the encrypted password
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
