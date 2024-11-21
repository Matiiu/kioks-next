import { prisma } from '@/src/lib/prisma';
import Heading from '@/components/ui/Heading';
import ProductTable from '@/components/products/ProductsTable';
import { normalizeText } from '@/src/utils/string';
import EmptyData from '@/components/ui/EmptyData';

type SearchPageProps = {
	searchParams: Promise<{ search: string }>;
};

async function searchProducts(searchTerm = '') {
	searchTerm = normalizeText(searchTerm);
	try {
		const products = await prisma.product.findMany({
			where: {
				normalizedName: {
					contains: searchTerm,
					mode: 'insensitive',
				},
			},
			include: {
				category: true,
			},
		});

		return products;
	} catch (error) {
		console.error('Error getting products:', error);
		return [];
	}
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const params = await searchParams;
	const search = params?.search || '';

	const products = await searchProducts(search);
	console.log('products:', products);

	return (
		<>
			<Heading>Resultados de búsqueda: {search} </Heading>
			{!!products.length ? (
				<ProductTable products={products} />
			) : (
				<EmptyData>No se encontraron productos</EmptyData>
			)}
		</>
	);
}
