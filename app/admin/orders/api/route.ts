import { prisma } from '@/src/lib/prisma';
import { consoleError, consoleSuccess } from '@/src/utils/logs/colors';

export async function GET() {
	try {
		const orders = await prisma.order.findMany({
			where: {
				status: {
					equals: 'PENDING',
					mode: 'insensitive',
				},
			},
			include: {
				orderProducts: {
					include: {
						product: true,
					},
				},
			},
		});

		consoleSuccess('Successfully fetched pending orders', orders);
		return Response.json(orders);
	} catch (error) {
		consoleError('Error getting pending orders:', error);
		return Response.json(
			{ error: 'Error getting pending orders' },
			{ status: 500 },
		);
	}
}
