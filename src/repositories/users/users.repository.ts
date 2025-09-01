import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class ManipulateUsers {
    abstract read(id: number): Promise<object>
    abstract create(): Promise<void>
    abstract delete(id: number): Promise<void>
    abstract update(id: number): Promise<void> 
}