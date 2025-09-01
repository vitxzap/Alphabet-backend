import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user/user-dto';
import { ManipulateUsers } from 'src/repositories/users/users.repository';


@Controller("/v1/user")
export class UsersController {
    constructor (private ManipulateUsers: ManipulateUsers){}
    @Get()
    async get(@Body() createUserDto: CreateUserDto){
        
        return "Hello World"
    }
}