import { PrismaService } from '../config/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<any>;
}
