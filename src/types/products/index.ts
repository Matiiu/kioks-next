import { z } from 'zod';
import { type Product as TPrismaProduct, type Category } from '@prisma/client';
import { productSchema } from '@/src/schemas/products';

export type ProductWithCategory = TPrismaProduct & {
	category: Category;
};

export type Product = z.infer<typeof productSchema>;
