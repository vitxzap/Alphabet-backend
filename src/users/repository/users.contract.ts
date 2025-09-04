import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/users.dto";
import { User } from "src/users/interface/users.interface";

@Injectable()
export abstract class UsersContracts {
    abstract findById(id: any): Promise<User | any>
    abstract create(user: CreateUserDto): Promise<void>
    abstract deleteById(id: string): Promise<void>
    abstract updateById(id: string): Promise<void> 
}