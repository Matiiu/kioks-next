import { create } from 'zustand';
import { type OrderItem } from '@/src/types/order';
import { type Product } from '@prisma/client';

type Store = {
	order: OrderItem[];
	addToCart: (product: Product) => void;
	increaseQuantity: (id: OrderItem['id']) => void;
	decreaseQuantity: (id: OrderItem['id']) => void;
	deleteOrder: (id: OrderItem['id']) => void;
	clearOrder: () => void;
};

const MAX_ORDER_QUANTITY = 15;
const MIN_ORDER_QUANTITY = 1;

export const useStore = create<Store>((set, get) => ({
	order: [],
	addToCart: (product) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { image, categoryId, ...productDetails } = product;
		const isOrderExist = get().order.some(
			(item) => item.id === productDetails.id,
		);
		let order: OrderItem[] = [];

		if (isOrderExist) {
			order = get().order.map((item) => {
				if (
					item.id === productDetails.id &&
					item.quantity < MAX_ORDER_QUANTITY
				) {
					const quantity = item.quantity + 1;

					return {
						...item,
						quantity,
						subtotal: quantity * item.price,
					};
				}
				return item;
			});
		} else {
			const newOrder = {
				...productDetails,
				quantity: 1,
				subtotal: productDetails.price,
			};
			order = [...get().order, { ...newOrder }];
		}

		set(() => ({ order }));
	},
	increaseQuantity: (id) => {
		const order = get().order.map((item) => {
			if (item.id === id && item.quantity < MAX_ORDER_QUANTITY) {
				const quantity = item.quantity + 1;

				return {
					...item,
					quantity,
					subtotal: quantity * item.price,
				};
			}
			return item;
		});

		set(() => ({ order }));
	},
	decreaseQuantity: (id) => {
		const order = get().order.map((item) => {
			if (item.id === id && item.quantity > MIN_ORDER_QUANTITY) {
				const quantity = item.quantity - 1;

				return {
					...item,
					quantity,
					subtotal: quantity * item.price,
				};
			}
			return item;
		});

		set(() => ({ order }));
	},
	deleteOrder: (id) => {
		const order = get().order.filter((item) => item.id !== id);
		set(() => ({ order }));
	},
	clearOrder: () => {
		set(() => ({ order: [] }));
	},
}));
