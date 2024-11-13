import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { type OrderItem } from '@/src/types/order';
import { useStore } from '@/src/store/store';

type UpdateQuantityButtonsProps = {
	item: OrderItem;
};

export default function UpdateQuantityButtons({
	item,
}: UpdateQuantityButtonsProps) {
	const { increaseQuantity, decreaseQuantity } = useStore();
	const disabledIncreaseButton = item.quantity >= 15;
	const disabledDecreaseButton = item.quantity <= 1;

	return (
		<div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
			<button
				type="button"
				className="disabled:opacity-10"
				disabled={disabledDecreaseButton}
				onClick={() => decreaseQuantity(item.id)}
			>
				<MinusIcon className="h-6 w-6" />
			</button>

			<p className="text-lg font-black ">{item.quantity}</p>

			<button
				type="button"
				className="disabled:opacity-10"
				onClick={() => increaseQuantity(item.id)}
				disabled={disabledIncreaseButton}
			>
				<PlusIcon className="h-6 w-6" />
			</button>
		</div>
	);
}
