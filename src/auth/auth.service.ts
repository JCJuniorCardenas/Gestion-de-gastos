import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../config/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Registrar nuevo usuario
  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    // Verificar que el email no exista
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException('El email ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario en la BD
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generar JWT
    const token = this.generateToken(user.id, user.email);

    return { token, email: user.email };
  }

  // Iniciar sesión
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar usuario por email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar JWT
    const token = this.generateToken(user.id, user.email);

    return { token, email: user.email };
  }

  // Método auxiliar para generar JWT
  private generateToken(userId: string, email: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
    });
  }
}
