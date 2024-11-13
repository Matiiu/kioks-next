import Link from 'next/link';
import { type Product } from '@prisma/client';
import { formatCurrency } from '@/src/utils/currency';

type ProductTableDataProps = {
	product: Product;
};

export default function ProductTableRow({ product }: ProductTableDataProps) {
	return (
		<tr>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
				{product.name}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{formatCurrency(product.price)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{product.categoryId}
			</td>
			<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
				<Link
					href={`/admin/products/${product.id}/edit`}
					className="text-indigo-600 hover:text-indigo-800"
				>
					Editar
					<span className="sr-only">, {product.name}</span>
				</Link>
			</td>
		</tr>
	);
}
