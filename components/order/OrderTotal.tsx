import { formatCurrency } from '@/src/utils/currency/index';
import { type OrderItem } from '@/src/types/order';
import { useMemo } from 'react';

type OrderTotalProps = {
	order: OrderItem[];
};

export default function OrderTotal({ order }: OrderTotalProps) {
	const total = useMemo(
		() => order.reduce((acc, item) => acc + item.subtotal, 0),
		[order],
	);

	return (
		<div className="mt-10 shadow space-y-1 p-4 bg-white border-t border-gray-200">
			<p className="text-2xl text-center">
				Total a Pagar:{' '}
				<span className="font-bold">{formatCurrency(total)}</span>
			</p>
		</div>
	);
}
