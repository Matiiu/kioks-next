'use server';
import { prisma } from '@/src/lib/prisma';
import { normalizeSpaces, normalizeText } from '@/src/utils/string';
import { responseSchema } from '@/src/utils/errors';
import { productSchema } from '@/src/schemas/products';
import { Product } from '@/src/types/products';

export async function createProduct(data: unknown) {
	const result = productSchema.safeParse(data);
	if (!result.success) {
		const errors = result.error.issues.map((issue) => ({
			message: issue.message,
		}));
		return responseSchema({ errors });
	}

	// Sanitize data
	const productData = result.data;
	for (const key in productData) {
		const keyType = key as keyof Product;
		if (typeof productData[keyType] === 'string') {
			(productData[keyType] as string) = normalizeSpaces(productData[keyType]);
		}
	}

	const normalizedName = normalizeText(result.data.name);
	try {
		await prisma.product.create({
			data: {
				...productData,
				normalizedName,
			},
		});
		return responseSchema({ success: 'Producto creado con éxito' });
	} catch (error) {
		console.error('Error creating product:', error);
		return responseSchema({ error: 'Error al crear el producto' });
	}
}
