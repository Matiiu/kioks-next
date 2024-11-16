import ProductTable from '@/components/products/ProductsTable';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';
import ProductsPagination from '../../../components/products/ProductsPagination';

async function productCount() {
	try {
		const count = await prisma.product.count();
		return count;
	} catch (error) {
		console.error('Error getting product count:', error);
		return 0;
	}
}

async function getProducts({ page = 1, pageSize = 10 }) {
	const startPage = page > 0 ? page - 1 : 0;
	const skip = startPage * pageSize;

	try {
		const products = await prisma.product.findMany({
			take: pageSize,
			skip,
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

type ProductsPageProps = {
	searchParams: {
		page: string;
	};
};

export default async function ProductsPage({
	searchParams,
}: ProductsPageProps) {
	const params = await searchParams;
	const page = +params?.page || 0;
	const PAGE_SIZE = 10;

	const [totalProducts, products] = await Promise.all([
		productCount(),
		getProducts({ page, pageSize: PAGE_SIZE }),
	]);
	const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

	return (
		<>
			<Heading>Administrar Productos</Heading>
			<ProductTable products={products} />
			<ProductsPagination page={page} totalPages={totalPages} />
		</>
	);
}
