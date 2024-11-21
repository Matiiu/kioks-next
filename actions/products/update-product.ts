'use server';
import { prisma } from '@/src/lib/prisma';
import { normalizeSpaces, normalizeText } from '@/src/utils/string';
import { responseSchema } from '@/src/utils/errors';
import { draftProductSchema, productIdSchema } from '@/src/schemas/products';
import { DraftProduct } from '@/src/types/products';
import { revalidatePath } from 'next/cache';

export async function updateProduct(id: string, data: unknown) {
	const result = draftProductSchema.safeParse(data);
	if (!result.success) {
		const errors = result.error.issues.map((issue) => ({
			message: issue.message,
		}));
		return responseSchema({ errors });
	}

	const validatingProductId = productIdSchema.safeParse(id);
	if (!validatingProductId.success) {
		const errors = validatingProductId.error.issues.map((issue) => ({
			message: issue.message,
		}));
		return responseSchema({ errors });
	}

	// Sanitize data
	const productData = result.data;
	for (const key in productData) {
		const keyType = key as keyof DraftProduct;
		if (typeof productData[keyType] === 'string') {
			(productData[keyType] as string) = normalizeSpaces(productData[keyType]);
		}
	}
	const normalizedName = normalizeText(result.data.name);

	try {
		await prisma.product.update({
			where: { id: validatingProductId.data },
			data: {
				...productData,
				normalizedName,
			},
		});

		// Revalidate the cache
		revalidatePath('admin/products');
		return responseSchema({ success: 'Producto actualizado con éxito' });
	} catch (error) {
		console.error('Error creating product:', error);
		return responseSchema({ error: 'Error al crear el producto' });
	}
}
