import { db } from 'src/db/client';
import { supervisors, supervising } from 'src/db/schema';
import { Injectable } from "@nestjs/common";

@Injectable()
export class SupervisorService {
  async findAll() {
    return db
      .select({
        id: supervisors.id,
        name: supervisors.name,
        age: supervisors.age,
        gender: supervisors.gender,
        experience: supervisors.description,
        avatar: supervisors.picture
      })
      .from(supervisors);
  }

  async assignSupervisor(userId: number, supervisorId: number) {
    return db.insert(supervising).values({
      userId,
      supervisorId,
    });
  }

}
