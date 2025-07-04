import { Injectable } from "@nestjs/common";
import { db } from "src/db/client";
import { users } from "src/db/schema";


@Injectable()
export class UserLogin {
    async testConnection() {
        const result = await db.select().from(users);
        return result;
    }
}
