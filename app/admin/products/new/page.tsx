import Heading from '@/components/ui/Heading';
import AddProductForm from '@/components/products/AddProductForm';
import ProductInputs from '@/components/products/ProductInputs';
import GoBackButton from '@/components/ui/GoBackButton';

export default async function NewProductPage() {
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
