import { PrismaService } from '../config/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateCategoryDto): Promise<any>;
    findAll(userId: string): Promise<any>;
    findOne(id: string, userId: string): Promise<any>;
    update(id: string, userId: string, dto: UpdateCategoryDto): Promise<any>;
    remove(id: string, userId: string): Promise<any>;
}
