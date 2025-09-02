import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/user/users.dto";
import { User } from "src/dtos/user/users.interface";
import { UsersContracts } from "src/repositories/users/users.contract";


@Injectable()
export class UsersService  {
    constructor(private contracts: UsersContracts) {}
    findById(id: any) {
        return this.contracts.findById(id)
    }

    create(user: CreateUserDto){
        return this.contracts.create(user)
    }

    
}