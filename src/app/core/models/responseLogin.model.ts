import { User } from "src/app/models/user.model";

export class ResponseLoginDto{
    constructor(
        public token?: string,
        public user?: User,
        public rolName?:string,
        public rolUser?:any
    ) { }
}