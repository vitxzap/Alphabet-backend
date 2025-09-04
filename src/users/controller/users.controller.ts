import { Controller, Get, Post, Body, Query, } from '@nestjs/common';
import { CreateUserDto, FindUserDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';


@Controller("/v1/user")
export class UsersController {
    constructor (private usersService: UsersService){}
    @Get()
     findById(@Query() { id }: FindUserDto){
        return this.usersService.findById(id)
    }

    @Post()
     create(@Body() user: CreateUserDto){
        return this.usersService.create(user)
     }
}