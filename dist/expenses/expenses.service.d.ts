import { PrismaService } from '../config/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateExpenseDto): Promise<any>;
    findAll(userId: string): Promise<any>;
    findOne(id: string, userId: string): Promise<any>;
    update(id: string, userId: string, dto: UpdateExpenseDto): Promise<any>;
    remove(id: string, userId: string): Promise<any>;
}
