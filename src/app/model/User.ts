import { State } from "./State";
import { AccountStatus } from "./AcountStatus";

export class User {
    email: string;
    password: string;
    address: string;
    state: State;
    zipCode: number;
    phoneNumber: number;
    accountStatus: AccountStatus;
    token?: string;
}