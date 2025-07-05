import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { db } from 'src/db/client';
import { supervisors, users } from 'src/db/schema';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string, role: 'user' | 'supervisor') {
    console.log('DEBUG: Validating ', email, password, role);
    
    const table = role === 'user' ? users : supervisors;

    const result = await db
      .select()
      .from(table)
      .where(eq(table.email, email))
      .limit(1);

    const foundUser = result[0];

    console.log('DEBUG: Found user ', foundUser);

    if (!foundUser || !foundUser.password) {
      throw new UnauthorizedException('Email not found');
    }

    // TODO: replace plain text password storage with bcrypt before production
    // const isMatch = await bcrypt.compare(password, foundUser.password);
    
    const isMatch = (password === foundUser.password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    return { role, ...foundUser };
  }

  async login(user: any, role: 'user' | 'supervisor') {
    const payload = { email: user.email, sub: user.id, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register({ name, email, password, birthdate }: { name: string; email: string; password: string; birthdate: string}) {
    console.log('DEBUG AUTH SERVICE REGISTER: ', name, email, password, birthdate);

    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length) throw new BadRequestException('Email sudah terdaftar');
    
    const newUser = await db.insert(users).values({
      name,
      email,
      birthDate: new Date(birthdate),
      password,
      picture: null
    }).returning();

    console.log(newUser[0]);

    return newUser[0];
  }
}
