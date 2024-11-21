'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/src/lib/prisma';
import { orderIdSchema } from '@/src/schemas/order';

export async function completeOrder(formData: FormData) {
	const orderId = formData.get('order_id');
	const validatingId = orderIdSchema.safeParse({ orderId });
	if (!validatingId.success) {
		validatingId.error.errors.forEach((err) =>
			console.log(err?.message ?? 'Error completing order'),
		);
		return;
	}

	try {
		await prisma.order.update({
			where: {
				id: validatingId.data.orderId,
			},
			data: {
				status: 'COMPLETED',
			},
		});
		// Revalidate the orders page to reflect the changes
		revalidatePath('/admin/orders');
	} catch (error) {
		console.log(
			'Error completing order:',
			error instanceof Error ? error.message : error,
		);
	}
}
