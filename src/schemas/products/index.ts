import { z } from 'zod';

export const searchProductSchema = z.object({
	search: z
		.string({
			required_error: 'La búsqueda no puede estar vacía',
			invalid_type_error: 'La búsqueda debe ser un texto',
		})
		.trim()
		.min(1, { message: 'La búsqueda no puede estar vacía' }),
});

export const productSchema = z.object({
	name: z
		.string({
			required_error: 'El Nombre del Producto no puede ir vacío',
			invalid_type_error: 'El Nombre del Producto debe ser un texto',
		})
		.trim()
		.min(1, { message: 'El Nombre del Producto no puede ir vació' }),
	price: z
		.string({
			required_error: 'El Precio no puede ir vacío',
			invalid_type_error: 'El Precio debe ser un número',
		})
		.trim()
		.transform((value) => parseFloat(value))
		.refine((value) => value > 0, { message: 'Precio no válido' })
		.or(z.number().min(1, { message: 'La Categoría es Obligatoria' })),
	categoryId: z
		.string({
			required_error: 'La Categoría es Obligatoria',
			invalid_type_error: 'La Categoría debe ser un número',
		})
		.trim()
		.transform((value) => parseInt(value))
		.refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
		.or(z.number().min(1, { message: 'La Categoría es Obligatoria' })),
	image: z
		.string({
			required_error: 'La Imagen es Obligatoria',
			invalid_type_error: 'La Imagen debe ser una URL',
		})
		.min(1, { message: 'La Imagen es Obligatoria' })
		.url({ message: 'La Imagen no es valida' }),
});
