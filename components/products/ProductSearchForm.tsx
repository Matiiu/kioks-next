'use client';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { searchProductSchema } from '@/src/schemas/products';
import { toast } from 'react-toastify';
import { normalizeSpaces } from '@/src/utils/string';

export default function ProductSearchForm() {
	const router = useRouter();

	const handleSearch = (formData: FormData) => {
		const data = {
			search: formData.get('search'),
		};

		const result = searchProductSchema.safeParse(data);

		if (!result.success) {
			console.log(result.error.issues);
			result.error.issues.forEach((issue) => toast.error(issue.message));
			return;
		}
		// Sanitize data
		const search = normalizeSpaces(result.data.search);

		router.push(`/admin/products/search?search=${search}`);
	};

	return (
		<Form action={handleSearch} className="flex items-center">
			<input
				type="text"
				placeholder="Buscar Producto"
				className="p-2 placeholder-gray-400 w-full"
				name="search"
			/>

			<button
				type="submit"
				className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
			>
				Buscar
			</button>
		</Form>
	);
}
