'use server';
import { prisma } from '@/src/lib/prisma';
import { orderConfirmationSchema } from '@/src/types/order';
import { normalizeSpaces } from '@/src/utils/string';
import { responseSchema } from '@/src/utils/errors';

export async function createOrder(order: unknown) {
	const result = orderConfirmationSchema.safeParse(order);

	if (!result.success) {
		const errors = result.error.issues.map((issue) => ({
			message: issue.message,
		}));
		return responseSchema({ errors });
	}

	// Sanitize data
	const cleanName = normalizeSpaces(result.data.name);
	if (!cleanName) {
		return responseSchema({ error: 'El nombre es requerido' });
	}

	// Preparing order items for Prisma
	const orderItems = result.data.order.map((item) => ({
		productId: item.id,
		quantity: item.quantity,
	}));

	// Save order in database
	try {
		await prisma.order.create({
			data: {
				name: cleanName,
				total: result.data.total,
				orderProducts: {
					create: orderItems,
				},
			},
		});
		return responseSchema({ success: 'Pedido guardado correctamente' });
	} catch (error) {
		console.error(
			'Error de Base de Datos:',
			error instanceof Error ? error.message : error,
		);
		return responseSchema({ error: 'Error al guardar el pedido' });
	}
}
