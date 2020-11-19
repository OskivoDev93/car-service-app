import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from 'src/auth/auth.dto';
import { User } from 'src/types/user';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    private sanitize;
    create(UserDTO: RegisterDTO): Promise<User>;
    findByLogin(UserDTO: LoginDTO): Promise<User>;
}
