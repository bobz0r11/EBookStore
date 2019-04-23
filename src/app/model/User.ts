import { State } from "./State";

export class User {
    username: string;
    password: string;
    address: string;
    state: State;
    zipCode: number;
    phoneNumber: number;
    token?: string;
}