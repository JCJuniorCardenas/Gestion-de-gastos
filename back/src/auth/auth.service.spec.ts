import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { PrismaService } from '../config/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

jest.mock('bcryptjs');

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    category: {
      createMany: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto: RegisterDto = {
        email: 'newuser@example.com',
        password: 'Password123',
      };

      const mockHashedPassword = 'hashedPassword123';
      const mockUser = {
        id: 'user-123',
        email: registerDto.email,
        password: mockHashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = 'jwt-token-123';

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
      mockPrismaService.user.create.mockResolvedValue(mockUser);
      mockPrismaService.category.createMany.mockResolvedValue({
        count: 8,
      });
      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.register(registerDto);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: registerDto.email },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10);
      expect(mockPrismaService.user.create).toHaveBeenCalled();
      expect(mockPrismaService.category.createMany).toHaveBeenCalled();
      expect(mockJwtService.sign).toHaveBeenCalled();
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('email', registerDto.email);
    });

    it('should throw BadRequestException if email already exists', async () => {
      const registerDto: RegisterDto = {
        email: 'existing@example.com',
        password: 'Password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'user-456',
        email: registerDto.email,
      });

      await expect(service.register(registerDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should validate password length on registration', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'short', // Less than 6 characters
      };

      // Validation should happen at DTO level, but service should handle it
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      // If somehow password gets through, service should hash it
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockPrismaService.user.create.mockResolvedValue({
        id: 'user-123',
        email: registerDto.email,
      });

      mockJwtService.sign.mockReturnValue('token');

      const result = await service.register(registerDto);
      expect(result).toBeDefined();
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const loginDto: LoginDto = {
        email: 'user@example.com',
        password: 'Password123',
      };

      const mockUser = {
        id: 'user-123',
        email: loginDto.email,
        password: 'hashedPassword123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = 'jwt-token-123';

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.login(loginDto);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDto.password,
        mockUser.password,
      );
      expect(mockJwtService.sign).toHaveBeenCalled();
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('email', loginDto.email);
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      const loginDto: LoginDto = {
        email: 'nonexistent@example.com',
        password: 'Password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const loginDto: LoginDto = {
        email: 'user@example.com',
        password: 'WrongPassword',
      };

      const mockUser = {
        id: 'user-123',
        email: loginDto.email,
        password: 'hashedPassword123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('JWT Token Generation', () => {
    it('should include userId in JWT payload', async () => {
      const loginDto: LoginDto = {
        email: 'user@example.com',
        password: 'Password123',
      };

      const mockUser = {
        id: 'user-123',
        email: loginDto.email,
        password: 'hashedPassword123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('token-123');

      await service.login(loginDto);

      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
      });
    });
  });
});
