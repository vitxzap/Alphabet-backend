import { Injectable } from "@nestjs/common";
import { AdminContract } from "./admin.contract";


@Injectable()
export class AdminService {
    constructor(private contract: AdminContract) {}

    
}