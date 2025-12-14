import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../models/User';
import { JwtPayload } from '../types';

export class AuthService {
  async register(email: string, password: string, isAdmin: boolean = false): Promise<{ token: string; user: any }> {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      email,
      password: hashedPassword,
      isAdmin,
    });

    const token = this.generateToken(user._id.toString(), user.email, user.isAdmin);

    return { 
      token, 
      user: {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      }
    };
  }

  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user._id.toString(), user.email, user.isAdmin);

    return { 
      token, 
      user: {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      }
    };
  }

  private generateToken(userId: string, email: string, isAdmin: boolean): string {
    const payload: JwtPayload = { userId, email, isAdmin };
    const secret = process.env.JWT_SECRET || 'default-secret-key';
    
    return jwt.sign(payload, secret, {
      expiresIn: '24h'
    });
  }
}
