import { z } from 'zod';
import { type Product as TPrismaProduct, type Category } from '@prisma/client';
import { draftProductSchema } from '@/src/schemas/products';

export type ProductWithCategory = TPrismaProduct & {
	category: Category;
};

export type DraftProduct = z.infer<typeof draftProductSchema>;
