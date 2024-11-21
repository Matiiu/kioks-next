import Heading from '@/components/ui/Heading';
import AddProductForm from '@/components/products/AddProductForm';
import { prisma } from '@/src/lib/prisma';
import ProductInputs from '@/components/products/ProductInputs';
import GoBackButton from '../../../../components/ui/GoBackButton';

async function findCategories() {
	try {
		const categories = await prisma.category.findMany();
		return categories;
	} catch (error) {
		console.error('Error getting categories:', error);
		return [];
	}
}

export default async function NewProductPage() {
	const categories = await findCategories();
	console.log('categories:', categories);
	return (
		<>
			<Heading>Nuevo Productos</Heading>
			<GoBackButton />
			<AddProductForm>
				<ProductInputs />
			</AddProductForm>
		</>
	);
}
