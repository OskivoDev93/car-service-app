import { UserService } from 'src/shared/user.service';
export declare class AuthController {
    private userService;
    constructor(userService: UserService);
    login(userDTO: any): Promise<import("../types/user").User>;
    register(userDTO: any): Promise<import("../types/user").User>;
}
