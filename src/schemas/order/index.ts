import { z } from 'zod';

export const orderItemSchema = z.object({
	id: z.number(),
	name: z.string(),
	price: z.number(),
	quantity: z.number(),
	subtotal: z.number(),
});

export const orderConfirmationSchema = z.object({
	name: z.string().min(1, 'El nombre es requerido'),
	total: z.number().min(1, 'El total es requerido'),
	order: z.array(orderItemSchema),
});

export const orderIdSchema = z
	.string()
	.transform((val) => parseInt(val))
	.refine((val) => val > 0, {
		message: 'El ID de la orden debe ser mayor a 0',
	});
