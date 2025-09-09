import { PrismaClient } from "generated/prisma";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit { //Create the PrismaService then Initialize it creating a connection
    async onModuleInit() {
        await this.$connect();
    }
}