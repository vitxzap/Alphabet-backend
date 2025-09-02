import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/user/users.dto";
import { User } from "src/dtos/user/users.interface";

@Injectable()
export abstract class UsersContracts {
    abstract findById(id: any): Promise<User | any>
    abstract create(user: CreateUserDto): Promise<void>
    abstract deleteById(id: string): Promise<void>
    abstract updateById(id: string): Promise<void> 
}