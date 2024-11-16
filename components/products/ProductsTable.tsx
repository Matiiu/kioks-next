import { ProductWithCategory } from '@/src/types/products';
import Link from 'next/link';
import { formatCurrency } from '@/src/utils/currency';

const TABLE_HEADER_OPTIONS = [
	{ id: '1', label: 'Producto' },
	{ id: '2', label: 'Precio' },
	{ id: '3', label: 'Categoría' },
] as const;

type ProductTableProps = {
	products: ProductWithCategory[];
};

export default function ProductTable({ products }: ProductTableProps) {
	return (
		<div className="px-4 sm:px-6 lg:px-8 mt-20">
			<div className="mt-8 flow-root ">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
						<table className="min-w-full divide-y divide-gray-300 ">
							<thead>
								<tr>
									{TABLE_HEADER_OPTIONS.map((option) => (
										<TableHeader key={option.id} label={option.label} />
									))}
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{products.map((product) => (
									<TableRow key={product.id} product={product} />
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

function TableHeader({ label = '' }) {
	return (
		<th
			scope="col"
			className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
		>
			{label}
		</th>
	);
}

function TableRow({ product }: { product: ProductWithCategory }) {
	return (
		<tr>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
				{product.name}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{formatCurrency(product.price)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{product.category.name}
			</td>
			<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
				<Link
					href={`/admin/products/${product.id}/edit`}
					className="text-indigo-600 hover:text-indigo-800"
					aria-label={`Editar ${product.name}`}
				>
					Editar
				</Link>
			</td>
		</tr>
	);
}
