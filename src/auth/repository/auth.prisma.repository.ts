import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AuthContracts } from './auth.contract';
import { logInDto, signInDto } from 'src/auth/dto/auth.dto';
import { encryptPassword, comparePassword } from './crypt';
@Injectable()
export class AuthPrismaRepository implements AuthContracts {
  constructor(private prisma: PrismaService) {}
  async validateSession(sessionId: string): Promise<boolean> {
    const session = await this.prisma.tb_user_session.count({
      where: {
        id: sessionId,
      },
    });
    if(session == 0) {
      throw new ForbiddenException("Session unauthorized.")
    }
    return true;
  }

  async logIn(request: logInDto, ip: string): Promise<string> {
    const user = await this.prisma.tb_user.findUniqueOrThrow({
      //Gets the user by email
      where: { email: request.email },
    });
    const isPasswordValid = await comparePassword(
      //Comparing passwords
      request.password,
      user.password,
    );
    if (!isPasswordValid) {
      // Verify if the password is valid and throws an error if its not
      throw new BadRequestException('Incorrect password.');
    }
    const activeSessionsByUser = await this.prisma.tb_user_session.count({ //verifying how many sessions the user have
      where: {
        userid: user.id,
      },
    }); 
    if (activeSessionsByUser >= 64) {
      //it will create a new session if user does not have more than 2 sessions
      throw new UnauthorizedException('User session limit exceeded');
    }
    const newUserSession = await this.prisma.tb_user_session.create({
      data: {
        userid: user.id,
        ipadress: ip,
      },
      select: {
        id: true,
      },
    });
    return newUserSession.id;
  }
  async signIn(user: signInDto): Promise<void> {
    const password = await encryptPassword(user.password); //Encrypt the password
    await this.prisma.tb_user.create({
      //Create the user using the encrypted password
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
