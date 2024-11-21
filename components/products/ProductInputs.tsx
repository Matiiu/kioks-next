import { prisma } from '@/src/lib/prisma';
import UploadImage from '@/components/products/UploadImage';
import { Product } from '@prisma/client';

async function findCategories() {
	try {
		const categories = await prisma.category.findMany();
		return categories;
	} catch (error) {
		console.error('Error getting categories:', error);
		return [];
	}
}

type ProductInputsProps = {
	product?: Product;
};

export default async function ProductInputs({ product }: ProductInputsProps) {
	const categories = await findCategories();

	return (
		<>
			<div className="space-y-2">
				<label className="text-slate-800" htmlFor="name">
					Nombre:
				</label>
				<input
					id="name"
					type="text"
					name="name"
					className="block w-full p-3 bg-slate-100"
					placeholder="Nombre Producto"
					defaultValue={product?.name}
				/>
			</div>

			<div className="space-y-2">
				<label className="text-slate-800" htmlFor="price">
					Precio:
				</label>
				<input
					id="price"
					name="price"
					className="block w-full p-3 bg-slate-100"
					placeholder="Precio Producto"
					defaultValue={product?.price}
				/>
			</div>

			<div className="space-y-2">
				<label className="text-slate-800" htmlFor="categoryId">
					Categoría:
				</label>
				<select
					className="block w-full p-3 bg-slate-100"
					id="categoryId"
					name="categoryId"
					defaultValue={product?.categoryId}
				>
					<option value="" disabled>
						-- Seleccione --
					</option>
					{!!categories.length &&
						categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
				</select>
			</div>

			<UploadImage image={product?.image} />
		</>
	);
}
