import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesController {
    private expensesService;
    constructor(expensesService: ExpensesService);
    create(user: {
        userId: string;
    }, dto: CreateExpenseDto): Promise<any>;
    findAll(user: {
        userId: string;
    }): Promise<any>;
    findOne(id: string, user: {
        userId: string;
    }): Promise<any>;
    update(id: string, user: {
        userId: string;
    }, dto: UpdateExpenseDto): Promise<any>;
    remove(id: string, user: {
        userId: string;
    }): Promise<any>;
}
