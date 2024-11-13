import ProductTable from '@/components/products/ProductsTable';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';

async function getProducts() {
	try {
		const products = await prisma.product.findMany();
		return products;
	} catch (error) {
		console.error('Error getting products:', error);
		return [];
	}
}

export default async function ProductsPage() {
	const products = await getProducts();
	console.log({ products });

	return (
		<>
			<Heading>Administrar Productos</Heading>
			<ProductTable products={products} />
		</>
	);
}
