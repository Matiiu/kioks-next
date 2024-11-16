import { type Product, type Category } from '@prisma/client';

export type ProductWithCategory = Product & {
	category: Category;
};
