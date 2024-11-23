'use client';
import useSWR from 'swr';
import Logo from '@/components/ui/Logo';
import type { OrderWithProducts } from '@/src/types/order';
import EmptyData from '@/components/ui/EmptyData';
import OrderItem from '@/components/order/OrderItem';

export default function OrdersPage() {
	const url = '/orders/api';
	const fetcher = () => fetch(url).then((res) => res.json());

	const { data: ordersReady, isLoading } = useSWR<OrderWithProducts[]>(
		url,
		fetcher,
		{
			refreshInterval: 60000,
			revalidateOnFocus: false,
		},
	);

	if (isLoading) return <p>Cargando...</p>;

	if (ordersReady)
		return (
			<>
				<h1 className="text-center mt-20 text-6xl font-black">
					ordenes Listas
				</h1>

				<Logo />

				{ordersReady.length === 0 ? (
					<EmptyData>No hay ordenes listas</EmptyData>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
						{ordersReady.map((order) => (
							<OrderItem key={order.id} order={order} />
						))}
					</div>
				)}
			</>
		);
}
