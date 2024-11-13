import { XCircleIcon } from '@heroicons/react/24/outline';
import { type OrderItem } from '@/src/types/order';
import { useStore } from '@/src/store/store';

type DeleteOrderButtonProps = {
	item: OrderItem;
};
export default function DeleteOrderButton({ item }: DeleteOrderButtonProps) {
	const deleteOrder = useStore((state) => state.deleteOrder);

	return (
		<button type="button" onClick={() => deleteOrder(item.id)}>
			<XCircleIcon className="text-red-600 h-8 w-8" />
		</button>
	);
}
