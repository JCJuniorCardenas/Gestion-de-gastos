import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    create(user: {
        userId: string;
    }, dto: CreateCategoryDto): Promise<any>;
    findAll(user: {
        userId: string;
    }): Promise<any>;
    findOne(id: string, user: {
        userId: string;
    }): Promise<any>;
    update(id: string, user: {
        userId: string;
    }, dto: UpdateCategoryDto): Promise<any>;
    remove(id: string, user: {
        userId: string;
    }): Promise<any>;
}
