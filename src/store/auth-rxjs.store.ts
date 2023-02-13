import {BehaviorSubject} from "rxjs";
import { AuthUser } from "../models/store/auth-user.model";

export class AuthUserRxJs {
    private static authUserSubject = new BehaviorSubject<AuthUser>(null!);
    static authUser$ = this.authUserSubject.asObservable();    
    
    static getAuthUser$(value: AuthUser){
        this.authUserSubject.next(value);
    }

}
