'use server';
import { prisma } from '@/src/lib/prisma';
import { orderIdSchema } from '@/src/schemas/order';
import { responseSchema } from '@/src/utils/errors';

export async function completeOrder(orderId: unknown) {
	const validatingId = orderIdSchema.safeParse(orderId);
	console.log('Validating ID:', validatingId);
	if (!validatingId.success) {
		const errors = validatingId.error.issues.map((issue) => ({
			message: issue.message,
		}));
		return responseSchema({ errors });
	}

	try {
		await prisma.order.update({
			where: {
				id: validatingId.data,
			},
			data: {
				status: 'COMPLETED',
				orderReadyAt: new Date(),
			},
		});
		return responseSchema({ success: 'Order completada con éxito' });
	} catch (error) {
		console.log(
			'Error completing order:',
			error instanceof Error ? error.message : error,
		);
		return responseSchema({ error: 'Error completing order' });
	}
}
