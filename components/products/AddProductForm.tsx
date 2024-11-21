'use client';
import { FormEvent } from 'react';
import Form from 'next/form';
import { productSchema } from '@/src/schemas/products';
import { toast } from 'react-toastify';
import { normalizeSpaces } from '@/src/utils/string';
import type { Product } from '@/src/types/products';
import { createProduct } from '@/actions/products/create-product';
import { useRouter } from 'next/navigation';

type AddProductFormProps = {
	children: React.ReactNode;
};

export default function AddProductForm({ children }: AddProductFormProps) {
	const router = useRouter();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data: Record<keyof Product, FormDataEntryValue | string> = {
			name: formData.get('name') || '',
			price: formData.get('price') || '',
			categoryId: formData.get('categoryId') || '',
			image: formData.get('image') || '',
		};

		// Sanitize data
		for (const key in data) {
			const keyType = key as keyof Product;
			if (typeof data[keyType] === 'string') {
				data[keyType] = normalizeSpaces(data[keyType]);
			}
		}

		// Freeze the data object to prevent any modifications
		Object.freeze(data);

		const result = productSchema.safeParse(data);
		if (!result.success) {
			result.error.issues.forEach((issue) => toast.error(issue.message));
			return;
		}

		try {
			const { errors, error, success } = await createProduct(result.data);
			if (errors.length) {
				errors.forEach((error) => toast.error(error.message));
				return;
			}
			if (error) {
				toast.error(error);
				return;
			}

			toast.success(success);
			router.push('/admin/products');
		} catch (error) {
			console.error('Error creating product:', error);
			toast.error(
				error instanceof Error ? error.message : 'Error al crear el producto',
			);
		}
	};

	return (
		<div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
			<Form action="" onSubmit={handleSubmit} className="space-y-5">
				{children}
				<button
					type="submit"
					className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase cursor-pointer"
				>
					Registrar Producto
				</button>
			</Form>
		</div>
	);
}
