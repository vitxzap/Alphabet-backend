import { Controller, Get, Post, Delete } from '@nestjs/common';
import { ManipulateUsers } from 'src/repositories/users/users.repository';


@Controller("/v1/templates")
export class UserController {
    constructor (private ManipulateUsers: ManipulateUsers){}
    @Get()
    async get(){
        return "Hello World"
    }
}