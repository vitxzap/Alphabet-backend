import { Injectable } from "@nestjs/common";
import { signInDto } from "src/auth/dto/auth.dto";
import { AuthContracts } from "./repository/auth.contract";


@Injectable()
export class AuthService  { //Auth methods
    constructor(private contracts: AuthContracts) {}
    logIn(id: any) {
        return this.contracts.logIn(id)
    }

    signIn(user: signInDto){
        return this.contracts.signIn(user)
    }

    
}