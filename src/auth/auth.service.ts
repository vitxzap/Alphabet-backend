import { Injectable } from "@nestjs/common";
import { signInDto } from "src/auth/dto/auth.dto";
import { Auth } from "src/auth/interface/auth.interface";
import { AuthContracts } from "./repository/auth.contract";


@Injectable()
export class AuthService  {
    constructor(private contracts: AuthContracts) {}
    logIn(id: any) {
        return this.contracts.logIn(id)
    }

    signIn(user: signInDto){
        return this.contracts.signIn(user)
    }

    
}