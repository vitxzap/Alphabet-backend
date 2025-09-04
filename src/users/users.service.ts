import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/users.dto";
import { User } from "src/users/interface/users.interface";
import { UsersContracts } from "./repository/users.contract";


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