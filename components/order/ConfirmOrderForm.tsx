import Form from 'next/form';
import { FormEvent } from 'react';
import { createOrder } from '@/actions/order/create-order-action';
import { orderConfirmationSchema } from '@/src/schemas/order';
import type { OrderItem } from '@/src/types/order';
import { normalizeSpaces } from '@/src/utils/string';
import { toast } from 'react-toastify';
import { useStore } from '@/src/store/store';

type ConfirmOrderFormProps = {
	order: OrderItem[];
};

export default function ConfirmOrderForm({ order }: ConfirmOrderFormProps) {
	const clearOrder = useStore((state) => state.clearOrder);

	const handleCreateOrder = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const data = {
			name: formData.get('name'),
			total: order.reduce((acc, item) => acc + item.subtotal, 0),
			order,
		};

		const result = orderConfirmationSchema.safeParse(data);
		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});
			return;
		}

		// Sanitize data
		result.data.name = normalizeSpaces(result.data.name);
		if (!result.data.name) {
			toast.error('El nombre es requerido');
			return;
		}

		const { errors, error, success } = await createOrder(result.data);

		if (errors.length) {
			errors.forEach((error) => {
				toast.error(error.message);
			});
			return;
		}
		if (error) {
			toast.error(error);
			return;
		}

		clearOrder();
		toast.success(success);
	};

	return (
		<Form
			className="w-full mt-10 space-y-5"
			onSubmit={handleCreateOrder}
			action=""
		>
			<input
				type="text"
				placeholder="Tu nombre"
				className="bg-white border border-gray-100 p-2 w-full"
				name="name"
				id="name"
			/>

			<button
				type="submit"
				name="button"
				className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
			>
				Confirmar Pedido
			</button>
		</Form>
	);
}
