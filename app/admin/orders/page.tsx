'use client';
import useSWR from 'swr';
import OrderCard from '@/components/order/OrderCard';
import Heading from '@/components/ui/Heading';
import type { OrderWithProducts } from '@/src/types/order';
import { toast } from 'react-toastify';

const url = '/admin/orders/api';

export default function OrdersPage() {
	const fetcher = () =>
		fetch(url)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.catch((error: Error) => {
				throw new Error(error?.message || 'Error cargando las ordenes');
			});
	const {
		data: pendingOrders,
		isLoading,
		error,
	} = useSWR<OrderWithProducts[]>(url, fetcher, {
		refreshInterval: 60000,
		revalidateOnFocus: false,
	});

	if (isLoading) return <p>Cargando...</p>;

	if (error) {
		toast.error(error.message);
		return <p>Error cargando las ordenes</p>;
	}

	if (pendingOrders)
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
