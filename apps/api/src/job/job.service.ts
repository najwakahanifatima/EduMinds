import { Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, ilike, SQL } from 'drizzle-orm';
import { db } from 'src/db/client';
import { jobs } from 'src/db/schema';

@Injectable()
export class JobService {
  async findAll(title?: string, location?: string) {
    const conditions: SQL[] = [];
    
    if (title) {
      conditions.push(ilike(jobs.title, `%${title}%`));
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
  async findOne(id: number) {
    const job = await db.query.jobs.findFirst({
      where: eq(jobs.id, id),
    });

    if (!job) {
      throw new NotFoundException(`Pekerjaan dengan ID ${id} tidak ditemukan`);
    }
    return job;
  }
}