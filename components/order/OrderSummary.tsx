'use client';
import { useStore } from '@/src/store/store';
import OrderDetails from '@/components/order/OrderDetails';
import OrderTotal from '@/components/order/OrderTotal';
import { useMemo } from 'react';
import ConfirmOrderForm from './ConfirmOrderForm';

export default function OrderSummary() {
	const order = useStore((state) => state.order);
	const isOrderEmpty = useMemo(() => order.length === 0, [order]);

	return (
		<aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
			<h1 className="text-4xl text-center font-black">Mi Pedido</h1>

			{isOrderEmpty ? (
				<p className="text-center my-10">El carrito esta vacío</p>
			) : (
				<>
					<div className="mt-5">
						{order.map((item) => (
							<OrderDetails key={item.id} item={item} />
						))}

						<OrderTotal order={order} />

						<ConfirmOrderForm order={order} />
					</div>
				</>
			)}
		</aside>
	);
}
