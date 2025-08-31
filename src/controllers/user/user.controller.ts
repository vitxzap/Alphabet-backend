import { Controller, Get, Post, Delete } from '@nestjs/common';
import { ManipulateUser } from 'src/repositories/user/user.repository';


@Controller("/v1/user")
export class UserController {
    constructor (private ManipulateUser: ManipulateUser){}
    @Get()
    async get(){
        return "Hello World"
    }
}