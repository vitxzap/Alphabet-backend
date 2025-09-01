import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { ManipulateUsers } from "./users.repository";

@Injectable()
export class PrismaManipulationUsers implements ManipulateUsers {
    constructor(private prisma: PrismaService) {}
    read(id: number): Promise<object> {
        throw new Error("Method not implemented.");
    }
    create(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}