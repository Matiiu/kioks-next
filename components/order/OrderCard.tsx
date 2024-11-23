import Form from 'next/form';
import { type OrderWithProducts } from '@/src/types/order';
import { formatCurrency } from '@/src/utils/currency';
import { completeOrder } from '@/actions/order/complete-order-action';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

type OrderCardProps = {
	order: OrderWithProducts;
};

export default function OrderCard({ order }: OrderCardProps) {
	const handleCompleteOrder = async (formData: FormData) => {
		try {
			const data = {
				orderId: formData.get('order_id'),
			};

			if (!data.orderId || typeof data.orderId !== 'string') {
				toast.error('Error completando la orden');
				return;
			}
			const { errors, error, success } = await completeOrder(data.orderId);
			console.log({ errors, error, success });
			if (errors.length) {
				errors.forEach((error) => toast.error(error.message));
				return;
			}
			if (error) {
				toast.error(error);
				return;
			}
			toast.success(success);
			// Invalidate the cache
			mutate('/admin/orders/api');
		} catch (error) {
			console.error('Error completando la orden:', error);
			toast.error('Error completando la orden');
		}
	};

	return (
		<section
			aria-labelledby="summary-heading"
			className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
		>
			<p className="text-2xl font-medium text-gray-900">
				Cliente: {order.name}
			</p>
			<p className="text-lg font-medium text-gray-900">Productos Ordenados:</p>
			<dl className="mt-6 space-y-4">
				{order.orderProducts.map((product) => (
					<div
						key={product.id}
						className="flex items-center gap-2 border-t border-gray-200 pt-4"
					>
						<dt className="flex items-center text-sm text-gray-600">
							<span className="font-black">({product.quantity}) </span>
						</dt>

						<dd className="tet-sm font-medium text-gray-900">
							{product.product.name}
						</dd>
					</div>
				))}
				<div className="flex items-center justify-between border-t border-gray-200 pt-4">
					<dt className="text-base font-medium text-gray-900">
						Total a Pagar:
					</dt>
					<dd className="text-base font-medium text-gray-900">
						{formatCurrency(order.total)}
					</dd>
				</div>
			</dl>

			<Form action={handleCompleteOrder}>
				<input type="hidden" name="order_id" value={order.id} />
				<button
					type="submit"
					className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
				>
					Marcar Orden Completada
				</button>
			</Form>
		</section>
	);
}
