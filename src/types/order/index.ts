import { z } from 'zod';
import { type Product, type Order, type OrderProducts } from '@prisma/client';
import { orderItemSchema, orderConfirmationSchema } from '@/src/schemas/order';

export type OrderItem = z.infer<typeof orderItemSchema>;
export type OrderConfirmationForm = z.infer<typeof orderConfirmationSchema>;
export type OrderWithProducts = Order & {
	orderProducts: (OrderProducts & {
		product: Product;
	})[];
};
