import type { OrderWithProducts } from '@/src/types/order';

type OrderItemProps = {
	order: OrderWithProducts;
};

export default function OrderItem({ order }: OrderItemProps) {
	return (
		<div className="bg-white shadow p-5 space-y-5 rounded-lg mx-5 mb:mx-0">
			<p className="text-2xl font-bold text-slate-600">
				Cliente : {order.name}
			</p>
			<ul
				role="list"
				className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
			>
				{order.orderProducts.length &&
					order.orderProducts.map((product) => (
						<li key={product.id} className="flex justify-between py-2 text-lg">
							<p>
								<span className="font-bold">
									({product.quantity}) {''}
								</span>
								{product.product.name}
							</p>
						</li>
					))}
			</ul>
		</div>
	);
}
