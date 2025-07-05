import { db } from 'src/db/client';
import { supervisors } from 'src/db/schema';
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
}
