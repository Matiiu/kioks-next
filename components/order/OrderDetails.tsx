import { type OrderItem } from '@/src/types/order';
import { formatCurrency } from '@/src/utils/currency';
import UpdateQuantityButtons from '@/components/order/UpdateQuantityButtons';
import DeleteOrderButton from '@/components/order/DeleteOrderButton';

type OrderDetailsProps = {
	item: OrderItem;
};

export default function OrderDetails({ item }: OrderDetailsProps) {
	return (
		<div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200">
			<div className="space-y-4">
				<div className="flex justify-between items-start">
					<p className="text-xl font-bold">{item.name} </p>
					<DeleteOrderButton item={item} />
				</div>
				<p className="text-2xl text-amber-500 font-black">
					{formatCurrency(item.price)}
				</p>
				<UpdateQuantityButtons item={item} />
				<p className="text-xl font-black text-gray-700">
					Subtotal: {formatCurrency(item.subtotal)}
					<span className="font-normal"></span>
				</p>
			</div>
		</div>
	);
}
