import OrderCard from '@/components/order/OrderCard';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';

async function getPendingOrders() {
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
		return orders;
	} catch (error) {
		console.error('Error getting pending orders:', error);
		return [];
	}
}

export default async function OrdersPage() {
	const pendingOrders = await getPendingOrders();

	return (
		<>
			<Heading>Administrar Ordenes</Heading>

			{pendingOrders.length === 0 ? (
				<p>No hay ordenes pendientes</p>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
					{pendingOrders.map((order) => (
						<OrderCard key={order.id} order={order} />
					))}
				</div>
			)}
		</>
	);
}
