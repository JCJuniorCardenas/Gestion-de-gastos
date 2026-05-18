import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(user: {
        userId: string;
        email: string;
    }): Promise<any>;
}
