import { Injectable } from '@nestjs/common';
import { and, eq, like, SQL } from 'drizzle-orm';
import { db } from 'src/db/client';
import { jobs } from 'src/db/schema';

@Injectable()
export class JobService {
  async findAll(title?: string, location?: string) {
    const conditions: SQL[] = [];
    
    if (title) {
      conditions.push(like(jobs.title, `%${title}%`));
    }
    
    if (location && location !== 'Semua Lokasi') {
      conditions.push(eq(jobs.location, location));
    }
    
    const result = await db
      .select()
      .from(jobs)
      .where(conditions.length ? and(...conditions) : undefined);
     
    return result;
  }
}