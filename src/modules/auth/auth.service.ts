import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);
const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(userId: string): string {
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
  }

  generateRefreshToken(userId: string): string {
    if (!refreshSecret) {
      throw new Error('REFRESH_SECRET is not defined');
    }
    return jwt.sign({ userId }, refreshSecret, { expiresIn: '7d' }); // Refrescar el token cada 7 días
  }

  verifyToken(token: string, isRefreshToken = false): { userId: string } {
    const secret = isRefreshToken ? refreshSecret : jwtSecret;
    if (!secret) {
      throw new Error('SECRET is not defined');
    }
    try {
      const decodedToken = jwt.verify(token, jwtSecret);
      return decodedToken as { userId: string };
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}
