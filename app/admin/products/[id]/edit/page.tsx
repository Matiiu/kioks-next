import { prisma } from '@/src/lib/prisma';
import { Product } from '@prisma/client';
import { notFound } from 'next/navigation';
import Heading from '@/components/ui/Heading';
import EditProductForm from '@/components/products/EditProductForm';
import ProductInputs from '@/components/products/ProductInputs';
import GoBackButton from '../../../../../components/ui/GoBackButton';

async function getProductById(id: Product['id']) {
	try {
		const product = await prisma.product.findUnique({
			where: { id },
		});
		if (!product) {
			notFound();
		}

		return product;
	} catch (error) {
		console.error('Error getting product by ID:', error);
		notFound();
	}
}

type EditProductPageProps = {
	params: Promise<{ id: string }>;
};

export default async function EditProductPage({
	params,
}: EditProductPageProps) {
	const { id } = await params;
	const productId = parseInt(id) || 0;
	const product = await getProductById(productId);
	console.log(product);

	return (
		<>
			<Heading>Editar Producto {product.name}</Heading>
			<GoBackButton />
			<EditProductForm>
				<ProductInputs product={product} />
			</EditProductForm>
		</>
	);
}
